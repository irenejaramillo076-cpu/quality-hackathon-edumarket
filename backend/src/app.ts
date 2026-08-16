import express from 'express';
import cors from 'cors';
import { courses, users } from './data.js';
import { createToken, findUserByCredentials } from './auth.js';
import { searchCourses } from './search.js';
import { addReview, getReviewsByCourse } from './reviews.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'EduMarket API' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByCredentials(email, password);

  if (!user) {
    // BUG UX-02: mensaje ambiguo, no orienta al usuario.
    return res.status(401).json({ message: 'Error' });
  }

  res.json({ token: createToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
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
  const review = addReview(Number(req.params.id), Number(req.body.userId ?? 2), String(req.body.comment ?? ''));
  res.status(201).json(review);
});

app.get('/api/courses/:id/report', async (req, res) => {
  const courseId = Number(req.params.id);
  // BUG PERF-02: patrón N+1 simulado, consulta información relacionada una por una.
  const related = courses
    .filter((course) => course.id !== courseId)
    .map((course) => ({ id: course.id, title: course.title, loadedIndividually: true }));

  res.json({ courseId, related });
});

app.delete('/api/admin/users/:id', (req, res) => {
  const currentUserId = Number(req.headers['x-user-id'] ?? 1);
  const targetId = Number(req.params.id);
  const index = users.findIndex((user) => user.id === targetId);

  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // BUG FUN-03: el administrador puede eliminar su propia cuenta.
  const [deleted] = users.splice(index, 1);
  res.json({ deleted, currentUserId });
});
