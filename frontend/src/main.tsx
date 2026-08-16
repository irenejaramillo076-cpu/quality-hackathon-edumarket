import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { CartItem, Course, ReportSummary, ReviewView, UserView } from './types';
import { addReview, deleteUser, getAdminUsers, getCourses, getProfile, getReportSummary, getReviews, login, register, searchCourses, simulatePayment } from './api';
import { calculateTotal } from './domain/checkout';
import { loadCart, saveCart } from './domain/cartStorage';
import './styles.css';

type View = 'catalog' | 'search' | 'checkout' | 'profile' | 'admin' | 'reports';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [cart, setCart] = useState<CartItem[]>(loadCart());
  const [coupon, setCoupon] = useState('MEDUCA20');
  const [message, setMessage] = useState('');
  const [view, setView] = useState<View>('catalog');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [token, setToken] = useState(() => localStorage.getItem('edumarket-token') ?? '');
  const [user, setUser] = useState<UserView | null>(() => {
    const raw = localStorage.getItem('edumarket-user');
    try { return raw ? JSON.parse(raw) as UserView : null; } catch { return null; }
  });
  const [loginEmail, setLoginEmail] = useState('estudiante@edumarket.pa');
  const [loginPassword, setLoginPassword] = useState('Estudiante123*');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<ReviewView[]>([]);
  const [reviewCourseId, setReviewCourseId] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [profile, setProfile] = useState<{ user: UserView; purchases: Array<{ confirmation: string; total: number; createdAt: string }> } | null>(null);
  const [adminUsers, setAdminUsers] = useState<UserView[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);

  useEffect(() => {
    getCourses().then(setCourses).catch(() => setMessage('Error'));
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const total = useMemo(() => calculateTotal(cart, coupon), [cart, coupon]);

  function persistSession(nextToken: string, nextUser: UserView) {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('edumarket-token', nextToken);
    localStorage.setItem('edumarket-user', JSON.stringify(nextUser));
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      const data = await login(loginEmail, loginPassword);
      persistSession(data.token, data.user);
      setMessage(`Bienvenido, ${data.user.name}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error');
    }
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    try {
      const data = await register(registerName, registerEmail, registerPassword);
      setMessage(`Cuenta creada para ${data.user.email}. Ya puedes iniciar sesión.`);
      setRegisterName(''); setRegisterEmail(''); setRegisterPassword('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error');
    }
  }

  function logout() {
    setToken(''); setUser(null); setProfile(null); setAdminUsers([]); setSummary(null);
    localStorage.removeItem('edumarket-token'); localStorage.removeItem('edumarket-user');
    setMessage('Sesión cerrada');
  }

  function addToCart(course: Course) {
    setCart((current) => {
      const existing = current.find((item) => item.id === course.id);
      if (existing) return current.map((item) => item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...course, quantity: 1 }];
    });
  }

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    try { setResults(await searchCourses(query)); } catch { setMessage('No fue posible buscar'); }
  }

  async function loadReviews(courseId: number) {
    setReviewCourseId(courseId);
    try { setReviews(await getReviews(courseId)); } catch { setMessage('No fue posible cargar reseñas'); }
  }

  async function submitReview(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return setMessage('Inicia sesión para publicar reseñas');
    try {
      await addReview(reviewCourseId, reviewText, token);
      setReviewText('');
      await loadReviews(reviewCourseId);
    } catch { setMessage('No fue posible publicar la reseña'); }
  }

  async function loadProfileView() {
    setView('profile');
    if (!user || !token) return setMessage('Inicia sesión para ver tu perfil');
    try { setProfile(await getProfile(user.id, token)); } catch { setMessage('No fue posible cargar el perfil'); }
  }

  async function loadAdminView() {
    setView('admin');
    if (!token) return setMessage('Inicia sesión como administrador');
    try { setAdminUsers(await getAdminUsers(token)); } catch { setMessage('Acceso administrativo no disponible'); }
  }

  async function removeUser(id: number) {
    if (!token) return;
    try {
      await deleteUser(id, token);
      setAdminUsers(await getAdminUsers(token));
      setMessage('Usuario eliminado');
    } catch { setMessage('No fue posible eliminar el usuario'); }
  }

  async function loadReportsView() {
    setView('reports');
    if (!token) return setMessage('Inicia sesión como administrador');
    try { setSummary(await getReportSummary(token)); } catch { setMessage('Reporte no disponible'); }
  }

  async function pay() {
    if (!token) return setMessage('Inicia sesión para completar la compra');
    if (!cart.length) return setMessage('Agrega al menos un curso');
    try {
      const result = await simulatePayment(cart.map((item) => item.id), total, token);
      setMessage(`Compra creada · ${result.confirmation}`);
      setCheckoutStep(1);
    } catch { setMessage('No fue posible procesar el pago'); }
  }

  return (
    <main>
      <header className="topbar">
        <div><strong>EduMarket Panamá</strong><span> · War Room</span></div>
        <nav>
          <button onClick={() => setView('catalog')}>Catálogo</button>
          <button onClick={() => setView('search')}>Búsqueda</button>
          <button onClick={() => setView('checkout')}>Checkout ({cart.length})</button>
          <button onClick={loadProfileView}>Perfil</button>
          {user?.role === 'admin' && <button onClick={loadAdminView}>Admin</button>}
          {user?.role === 'admin' && <button onClick={loadReportsView}>Reportes</button>}
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Campaña nacional 2026</p>
          <h1>Aprende. Crece. Transforma.</h1>
          <p>Plataforma panameña para cursos en línea con una campaña de lanzamiento en 72 horas.</p>
        </div>
        <img src="/assets/banner.svg" />
      </section>

      <section className="auth-strip">
        {!user ? <>
          <form onSubmit={handleLogin} className="compact-form">
            <h3>Iniciar sesión</h3>
            <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Correo" />
            <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" placeholder="Contraseña" />
            <button>Entrar</button>
          </form>
          <form onSubmit={handleRegister} className="compact-form">
            <h3>Registro</h3>
            <input value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Nombre completo" />
            <input value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Correo" />
            <input value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} type="password" placeholder="Contraseña" />
            <button>Crear cuenta</button>
          </form>
        </> : <div className="session-box"><span>Sesión: <strong>{user.name}</strong> · {user.role}</span><button onClick={logout}>Salir</button></div>}
      </section>

      {message && <p className="message">{message}</p>}

      {view === 'catalog' && <section className="catalog">
        <h2>Catálogo de cursos</h2>
        <div className="grid">
          {courses.map((course) => <article className="course-card" key={course.id}>
            <img src={course.imageUrl} />
            <h3>{course.title}</h3>
            <p>{course.category} · ⭐ {course.rating}</p>
            <strong>${course.price.toFixed(2)}</strong>
            <div className="fake-button" onClick={() => addToCart(course)}>Agregar al carrito</div>
            <button className="link-button" onClick={() => loadReviews(course.id)}>Ver reseñas</button>
          </article>)}
        </div>
        <section className="reviews-box">
          <h3>Reseñas del curso #{reviewCourseId}</h3>
          {reviews.length ? reviews.map((review) => <div key={review.id} className="review" dangerouslySetInnerHTML={{ __html: review.comment }} />) : <p>Selecciona “Ver reseñas” en un curso.</p>}
          <form onSubmit={submitReview}><input value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Escribe tu reseña" /><button>Publicar</button></form>
        </section>
      </section>}

      {view === 'search' && <section className="panel">
        <h2>Búsqueda</h2>
        <form onSubmit={handleSearch} className="search-form"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Curso o categoría" /><button>Buscar</button></form>
        <div className="search-results">{results.map((course) => <article key={course.id}><strong>{course.title}</strong><span>${course.price.toFixed(2)}</span><button onClick={() => addToCart(course)}>Agregar</button></article>)}</div>
      </section>}

      {view === 'checkout' && <section className="panel checkout">
        <h2>Checkout</h2>
        <p className="step">Paso {checkoutStep} de 5</p>
        {checkoutStep === 1 && <div><h3>1. Revisión del carrito</h3>{cart.map((item) => <p key={item.id}>{item.title} × {item.quantity}</p>)}</div>}
        {checkoutStep === 2 && <div><h3>2. Datos de contacto</h3><input placeholder="Teléfono" /><input placeholder="Dirección" /></div>}
        {checkoutStep === 3 && <div><h3>3. Facturación</h3><input placeholder="Nombre para factura" /><input placeholder="RUC opcional" /></div>}
        {checkoutStep === 4 && <div><h3>4. Promoción</h3><input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Cupón" /><p>Total calculado: <strong>${total.toFixed(2)}</strong></p></div>}
        {checkoutStep === 5 && <div><h3>5. Pago simulado</h3><p>Confirma el pago de <strong>${total.toFixed(2)}</strong>.</p><button onClick={pay}>Pagar ahora</button></div>}
        <div className="checkout-actions"><button disabled={checkoutStep === 1} onClick={() => setCheckoutStep((step) => Math.max(1, step - 1))}>Atrás</button><button disabled={checkoutStep === 5} onClick={() => setCheckoutStep((step) => Math.min(5, step + 1))}>Continuar</button></div>
      </section>}

      {view === 'profile' && <section className="panel"><h2>Perfil del estudiante</h2>{profile ? <><p><strong>{profile.user.name}</strong></p><p>{profile.user.email}</p><h3>Compras</h3>{profile.purchases.map((purchase) => <p key={purchase.confirmation}>{purchase.confirmation} · ${purchase.total.toFixed(2)}</p>)}</> : <p>Inicia sesión para consultar tu información.</p>}</section>}

      {view === 'admin' && <section className="panel"><h2>Panel administrativo</h2><p>Gestión de usuarios</p>{adminUsers.map((item) => <div className="admin-row" key={item.id}><span>{item.name} · {item.email} · {item.role}</span><button onClick={() => removeUser(item.id)}>Eliminar</button></div>)}</section>}

      {view === 'reports' && <section className="panel"><h2>Reportes</h2>{summary ? <div className="metrics"><article><strong>{summary.users}</strong><span>Usuarios</span></article><article><strong>{summary.courses}</strong><span>Cursos</span></article><article><strong>{summary.orders}</strong><span>Compras</span></article><article><strong>${summary.revenue.toFixed(2)}</strong><span>Ingresos</span></article></div> : <p>Reporte administrativo no disponible.</p>}</section>}

      <aside className="cart-panel">
        <h2>Carrito rápido</h2>
        <p>{cart.reduce((sum, item) => sum + item.quantity, 0)} cursos seleccionados</p>
        <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Cupón" />
        <p>Total: <strong>${total.toFixed(2)}</strong></p>
        <button onClick={() => setView('checkout')}>Ir al checkout</button>
      </aside>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
