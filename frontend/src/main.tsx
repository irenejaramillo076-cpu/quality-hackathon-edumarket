import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { CartItem, Course } from './types';
import { getCourses } from './api';
import { calculateTotal } from './domain/checkout';
import { loadCart, saveCart } from './domain/cartStorage';
import './styles.css';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [cart, setCart] = useState<CartItem[]>(loadCart());
  const [coupon, setCoupon] = useState('MEDUCA20');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCourses().then(setCourses).catch(() => setMessage('Error'));
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const total = useMemo(() => calculateTotal(cart, coupon), [cart, coupon]);

  function addToCart(course: Course) {
    setCart((current) => {
      const existing = current.find((item) => item.id === course.id);
      if (existing) {
        return current.map((item) => item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...course, quantity: 1 }];
    });
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Campaña nacional 2026</p>
          <h1>EduMarket Panamá</h1>
          <p>Compra cursos en línea para docentes, estudiantes y profesionales.</p>
        </div>
        <img src="/assets/banner-large-uncompressed.png" />
      </section>

      <section className="catalog">
        <h2>Catálogo de cursos</h2>
        <div className="grid">
          {courses.map((course) => (
            <article className="course-card" key={course.id}>
              <img src={course.imageUrl} />
              <h3>{course.title}</h3>
              <p>{course.category} · ⭐ {course.rating}</p>
              <strong>${course.price.toFixed(2)}</strong>
              <div className="fake-button" onClick={() => addToCart(course)}>Agregar al carrito</div>
            </article>
          ))}
        </div>
      </section>

      <aside className="cart-panel">
        <h2>Carrito</h2>
        <p>{cart.length} cursos seleccionados</p>
        <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Cupón" />
        <p>Total: <strong>${total.toFixed(2)}</strong></p>
        <button onClick={() => setMessage('Compra creada')}>Pagar ahora</button>
        {message && <p className="message">{message}</p>}
      </aside>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
