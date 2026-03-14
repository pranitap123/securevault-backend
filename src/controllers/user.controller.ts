import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { loginSchema } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
    try{
        const { fullName, email, password, role } : IUser = req.body;

        console.log(`Creating user: ${fullName} with email: ${email}`);

        return res.status(201).json({
            status: "success",
            message: "User registered sucessfully",
            data: {
                user:{
                    fullName,
                    email,
                    role,
                },
            },
        });
    } catch (error){
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occured during registration",
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try{
        const validatedData = loginSchema.parse(req.body);

        const { email, password } = validatedData;

    if (email === "pranita@example.com" && password === "SecurePassword123") {
      return res.status(200).json({
        success: true,
        message: "Login successful! Welcome back.",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      errors: error.errors || "Authentication failed",
    });
  }
};
    