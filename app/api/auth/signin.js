import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '@/lib/db'; // Use your db util

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const user = await db.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: 'User not found' });

  const isMatch = await compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token, user });
}
