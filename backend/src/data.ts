export type Role = 'admin' | 'student';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export interface Review {
  id: number;
  courseId: number;
  userId: number;
  comment: string;
  createdAt: string;
}

export const users: User[] = [
  { id: 1, name: 'Administradora EduMarket', email: 'admin@edumarket.pa', password: 'Admin123*', role: 'admin' },
  { id: 2, name: 'Estudiante Demo', email: 'estudiante@edumarket.pa', password: 'Estudiante123*', role: 'student' }
];

export const courses: Course[] = [
  { id: 1, title: 'Didáctica Digital para Docentes', category: 'Educación', price: 120, imageUrl: '/assets/course-didactica.jpg', rating: 4.8 },
  { id: 2, title: 'Ciberseguridad Básica', category: 'Tecnología', price: 95, imageUrl: '/assets/course-cyber.jpg', rating: 4.7 },
  { id: 3, title: 'Evaluación Formativa con TIC', category: 'Educación', price: 80, imageUrl: '/assets/course-evaluacion.jpg', rating: 4.6 },
  { id: 4, title: 'Programación Web con React', category: 'Tecnología', price: 150, imageUrl: '/assets/course-react.jpg', rating: 4.9 }
];

export const reviews: Review[] = [
  { id: 1, courseId: 1, userId: 2, comment: 'Curso claro y útil.', createdAt: new Date().toISOString() }
];
