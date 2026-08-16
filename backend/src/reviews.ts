import { reviews, type Review } from './data.js';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function addReview(courseId: number, userId: number, comment: string): Review {
  const review: Review = {
    id: reviews.length + 1,
    courseId,
    userId,
    comment: escapeHtml(comment),
    createdAt: new Date().toISOString()
  };
  reviews.push(review);
  return review;
}

export function getReviewsByCourse(courseId: number) {
  return reviews.filter((review) => review.courseId === courseId);
}
