import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { loginSchema } from "../models/user.model";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
    try{
        const { fullName, email, password, role } : IUser = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        console.log("Password to save: ", hashPassword);

        res.status(201).json({ message: "User registered securely" });

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

        const storedHashedPassword = "$2a$10$YourStoredHashFromDB...";

        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if(!isMatch){
          return res.status(401).json({ message: "Invalid credentials "});
        }

        res.status(200).json({ message: "Login successful" });

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
    