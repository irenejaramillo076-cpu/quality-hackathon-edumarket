import { reviews, type Review } from './data.js';

export function addReview(courseId: number, userId: number, comment: string): Review {
  // BUG SEC-02: se guarda el comentario sin sanitizar, permitiendo XSS persistente.
  const review: Review = {
    id: reviews.length + 1,
    courseId,
    userId,
    comment,
    createdAt: new Date().toISOString()
  };
  reviews.push(review);
  return review;
}

export function getReviewsByCourse(courseId: number) {
  return reviews.filter((review) => review.courseId === courseId);
}
