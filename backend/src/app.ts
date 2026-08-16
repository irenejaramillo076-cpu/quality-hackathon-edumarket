import express, { type Request } from 'express';
import cors from 'cors';
import { courses, orders, users } from './data.js';
import { createToken, findUserByCredentials, verifyToken } from './auth.js';
import { searchCourses } from './search.js';
import { addReview, getReviewsByCourse } from './reviews.js';

export const app = express();

app.use(cors());
app.use(express.json());

function readSession(req: Request): { id: number; role: string } | null {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) return null;
  try {
    const payload = verifyToken(authorization.slice(7));
    if (typeof payload === 'string') return null;
    return { id: Number(payload.sub), role: String(payload.role ?? '') };
  } catch {
    return null;
  }
}

function requireSession(req: Request, res: express.Response) {
  const session = readSession(req);
  if (!session) res.status(401).json({ message: 'Sesión requerida' });
  return session;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'EduMarket API' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByCredentials(String(email ?? ''), String(password ?? ''));
  if (!user) {
    // BUG UX-02: mensaje ambiguo, no orienta al usuario.
    return res.status(401).json({ message: 'Error' });
  }
  res.json({ token: createToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/register', (req, res) => {
  const name = String(req.body.name ?? '').trim();
  const email = String(req.body.email ?? '').trim().toLowerCase();
  const password = String(req.body.password ?? '');
  if (name.length < 3 || !email.includes('@') || password.length < 8) {
    return res.status(400).json({ message: 'Datos de registro inválidos' });
  }
  if (users.some((user) => user.email.toLowerCase() === email)) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }
  const user = { id: Math.max(...users.map((item) => item.id)) + 1, name, email, password, role: 'student' as const };
  users.push(user);
  return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/courses', (_req, res) => {
  res.json(courses);
});

app.get('/api/courses/search', (req, res) => {
  const q = String(req.query.q ?? '');
  res.json({ sql: `debug:${q}`, results: searchCourses(q) });
});

app.get('/api/courses/:id/reviews', (req, res) => {
  res.json(getReviewsByCourse(Number(req.params.id)));
});

app.post('/api/courses/:id/reviews', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  const review = addReview(Number(req.params.id), session.id, String(req.body.comment ?? ''));
  res.status(201).json(review);
});

app.get('/api/profile/:id', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  const targetId = Number(req.params.id);
  if (session.id !== targetId && session.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
  const user = users.find((item) => item.id === targetId);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  const purchases = orders.filter((order) => order.userId === user.id);
  return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, purchases });
});

app.post('/api/payments/simulate', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  const courseIds = Array.isArray(req.body.courseIds) ? req.body.courseIds.map(Number) : [];
  const total = Number(req.body.total ?? 0);
  if (!courseIds.length || !Number.isFinite(total) || total <= 0) return res.status(400).json({ message: 'Compra inválida' });
  const confirmation = `EDU-${Date.now().toString().slice(-8)}`;
  const order = { id: orders.length + 1, userId: session.id, courseIds, total, status: 'approved' as const, confirmation, createdAt: new Date().toISOString() };
  orders.push(order);
  return res.status(201).json(order);
});

app.get('/api/admin/users', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  if (session.role !== 'admin') return res.status(403).json({ message: 'Solo administradores' });
  return res.json(users.map(({ password: _password, ...user }) => user));
});

app.delete('/api/admin/users/:id', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  if (session.role !== 'admin') return res.status(403).json({ message: 'Solo administradores' });
  const targetId = Number(req.params.id);
  const index = users.findIndex((user) => user.id === targetId);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  // BUG FUN-03: el administrador puede eliminar su propia cuenta.
  const [deleted] = users.splice(index, 1);
  const { password: _password, ...safeDeleted } = deleted;
  return res.json({ deleted: safeDeleted, currentUserId: session.id });
});

app.get('/api/reports/summary', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  if (session.role !== 'admin') return res.status(403).json({ message: 'Solo administradores' });
  return res.json({ users: users.length, courses: courses.length, orders: orders.length, revenue: orders.reduce((sum, order) => sum + order.total, 0) });
});

app.get('/api/courses/:id/report', (req, res) => {
  const session = requireSession(req, res);
  if (!session) return;
  const courseId = Number(req.params.id);
  // BUG PERF-02: patrón N+1 simulado, carga información relacionada una por una.
  const related = courses.filter((course) => course.id !== courseId).map((course) => ({ id: course.id, title: course.title, loadedIndividually: true }));
  res.json({ courseId, related });
});
