import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const decoded = verifyAccessToken(token);
  
  if (!decoded) {
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }

  
  (req as any).user = decoded; 
  next();
};