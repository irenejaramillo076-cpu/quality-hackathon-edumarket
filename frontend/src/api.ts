import type { Course, ReportSummary, ReviewView, UserView } from './types';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001/api';

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers ?? {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? 'Error');
  return data as T;
}

export function getCourses() { return request<Course[]>('/courses'); }
export async function searchCourses(q: string) { const data = await request<{ results: Course[] }>(`/courses/search?q=${encodeURIComponent(q)}`); return data.results; }
export function login(email: string, password: string) { return request<{ token: string; user: UserView }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); }
export function register(name: string, email: string, password: string) { return request<{ user: UserView }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }); }
export function getReviews(courseId: number) { return request<ReviewView[]>(`/courses/${courseId}/reviews`); }
export function addReview(courseId: number, comment: string, token: string) { return request<ReviewView>(`/courses/${courseId}/reviews`, { method: 'POST', body: JSON.stringify({ comment }) }, token); }
export function getProfile(userId: number, token: string) { return request<{ user: UserView; purchases: Array<{ confirmation: string; total: number; createdAt: string }> }>(`/profile/${userId}`, {}, token); }
export function simulatePayment(courseIds: number[], total: number, token: string) { return request<{ confirmation: string }>('/payments/simulate', { method: 'POST', body: JSON.stringify({ courseIds, total }) }, token); }
export function getAdminUsers(token: string) { return request<UserView[]>('/admin/users', {}, token); }
export function deleteUser(id: number, token: string) { return request<{ deleted: UserView }>(`/admin/users/${id}`, { method: 'DELETE' }, token); }
export function getReportSummary(token: string) { return request<ReportSummary>('/reports/summary', {}, token); }
