import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  console.warn("WARNING: JWT Secrets are not defined in .env. Using insecure fallbacks.");
}

interface TokenPayload {
  id: string;
}

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { id: userId }, 
    ACCESS_SECRET || 'dev_access_secret', 
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId }, 
    REFRESH_SECRET || 'dev_refresh_secret', 
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET || 'dev_access_secret') as TokenPayload;
  } catch (error) {
    return null; 
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET || 'dev_refresh_secret') as TokenPayload;
  } catch (error) {
    return null;
  }
};