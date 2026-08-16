CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  image_url TEXT,
  rating REAL DEFAULT 0
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  course_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO users VALUES
(1, 'Administradora EduMarket', 'admin@edumarket.pa', 'Admin123*', 'admin'),
(2, 'Estudiante Demo', 'estudiante@edumarket.pa', 'Estudiante123*', 'student');

INSERT INTO courses VALUES
(1, 'Didáctica Digital para Docentes', 'Educación', 120.00, '/assets/course-didactica.jpg', 4.8),
(2, 'Ciberseguridad Básica', 'Tecnología', 95.00, '/assets/course-cyber.jpg', 4.7),
(3, 'Evaluación Formativa con TIC', 'Educación', 80.00, '/assets/course-evaluacion.jpg', 4.6),
(4, 'Programación Web con React', 'Tecnología', 150.00, '/assets/course-react.jpg', 4.9);
