import express, { Request, Response } from "express";
import authRoutes from "./routes/user.routes"; 

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes); 

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "SecureVault API is active" });
});

export default app;