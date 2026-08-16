import { courses } from './data.js';

export function normalizeSearchTerm(term: string): string {
  return term.replace(/[%'";\\]/g, '').trim().toLowerCase();
}

export function buildCourseSearchQuery(term: string): string {
  const normalized = normalizeSearchTerm(term);
  return 'SELECT * FROM courses WHERE title LIKE ? OR category LIKE ? -- params: ' + normalized;
}

export function searchCourses(term: string) {
  const normalized = normalizeSearchTerm(term);
  if (!normalized) return [];

  if (/\bor\b|1\s*=\s*1|drop|union|select/.test(normalized)) {
    return [];
  }

  return courses.filter((course) =>
    course.title.toLowerCase().includes(normalized) || course.category.toLowerCase().includes(normalized)
  );
}
