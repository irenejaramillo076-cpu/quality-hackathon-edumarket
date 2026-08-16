import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { createToken } from '../src/auth.js';
import { users } from '../src/data.js';

describe('jwt security', () => {
  it('creates tokens with expiration claim', () => {
    const token = createToken(users[0]);
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    expect(decoded.exp).toBeTypeOf('number');
  });
});
