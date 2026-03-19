import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { generateTokens, verifyRefreshToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email: cleanEmail, password: hashedPassword, fullName: fullName.trim() },
    });

    return res.status(201).json({ 
      message: "Registration successful", 
      user: { id: user.id, email: user.email, fullName: user.fullName } 
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (!user) return res.status(401).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, fullName: user.fullName }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body; 
    if (!token) return res.status(401).json({ message: "Refresh token is required." });

    const payload = verifyRefreshToken(token);
    if (!payload) return res.status(403).json({ message: "Invalid or expired refresh token." });

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.status(404).json({ message: "User not found." });

    const tokens = generateTokens(user.id);
    return res.status(200).json({ message: "Token refreshed successfully", ...tokens });
  } catch (error) {
    console.error("Refresh Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};