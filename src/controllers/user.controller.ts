import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });

    return res.status(201).json({
      message: "Registration successful",
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body; 

    if (!token) {
      return res.status(401).json({ message: "Refresh token is required." });
    }

    const payload = verifyRefreshToken(token);
    if (!payload) {
      return res.status(403).json({ message: "Invalid or expired refresh token." });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const tokens = generateTokens(user.id);

    return res.status(200).json({
      message: "Token refreshed successfully",
      ...tokens,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};