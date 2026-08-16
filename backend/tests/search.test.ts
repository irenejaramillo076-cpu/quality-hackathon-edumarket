import { describe, expect, it } from 'vitest';
import { searchCourses } from '../src/search.js';

describe('course search security', () => {
  it('does not return all courses when receiving an SQL Injection payload', () => {
    const results = searchCourses("' OR '1'='1");
    expect(results).toHaveLength(0);
  });
});
