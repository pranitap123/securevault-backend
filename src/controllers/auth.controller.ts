import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, fullName }
    });

    res.status(201).json({ message: "Success", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};