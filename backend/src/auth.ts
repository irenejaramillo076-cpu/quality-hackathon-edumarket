import jwt from 'jsonwebtoken';
import { users, type User } from './data.js';

const secret = process.env.JWT_SECRET ?? 'hackathon-secret';

export function findUserByCredentials(email: string, password: string): User | undefined {
  return users.find((user) => user.email === email && user.password === password);
}

export function createToken(user: User): string {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    secret,
    { expiresIn: '1h' }
  );
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, secret);
}
