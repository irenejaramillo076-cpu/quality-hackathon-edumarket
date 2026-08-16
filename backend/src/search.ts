import { courses } from './data.js';

export function buildCourseSearchQuery(term: string): string {
  // BUG SEC-01: construcción de consulta por concatenación, vulnerable a SQL Injection.
  return `SELECT * FROM courses WHERE title LIKE '%${term}%' OR category LIKE '%${term}%'`;
}

export function searchCourses(term: string) {
  const query = buildCourseSearchQuery(term);
  if (query.includes("' OR '1'='1") || query.includes('1=1')) {
    return courses;
  }

  const normalized = term.toLowerCase();
  return courses.filter((course) =>
    course.title.toLowerCase().includes(normalized) || course.category.toLowerCase().includes(normalized)
  );
}
