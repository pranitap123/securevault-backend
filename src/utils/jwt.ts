import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface TokenPayload {
  id: string;
}

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: '15m', 
  });

  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: '7d', 
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  } catch (error) {
    return null; 
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};