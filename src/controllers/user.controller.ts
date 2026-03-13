import { Request, Response } from "express";
import { IUser } from "../models/user.model";

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