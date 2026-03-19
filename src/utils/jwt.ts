import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret_123';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_456';

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: '15m', 
  });

  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: '7d', 
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};