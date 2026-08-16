import { describe, expect, it } from 'vitest';
import { addReview } from '../src/reviews.js';

describe('review sanitization', () => {
  it('escapes scripts before storing review content', () => {
    const review = addReview(1, 2, '<script>alert("xss")</script>Excelente');
    expect(review.comment).not.toContain('<script>');
    expect(review.comment).toContain('&lt;script&gt;');
  });
});
