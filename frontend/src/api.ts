import type { Course } from './types';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001/api';

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE}/courses`);
  return response.json();
}

export async function searchCourses(q: string): Promise<Course[]> {
  const response = await fetch(`${API_BASE}/courses/search?q=${encodeURIComponent(q)}`);
  const data = await response.json();
  return data.results;
}
