import { z } from "zod";

export const UserRole = z.enum(["USER", "ADMIN", "PREMIUM"]);

export const userSchema = z.object({

  fullName : z
             .string()
             .min(3, "Full name must be at least 3 characters")
             .max(50),
  
  email : z
          .string()
          .email("Please provide a valid email")
          .trim()
          .toLowerCase(),
          
  password : z
             .string()
             .min(8, "Password must be at least 8 characters")
             .regex(/[A-Z]/, "Must contain one uppercase letter")
             .regex(/[0-9]/, "Must contain one number"),

  role : UserRole.default("USER"),

  isMfaEnabled: z.boolean().default(false),

  createdAt : z.date().optional(),

  bio : z
        .string()
        .min(1)
        .max(200, "Character limit is upto 200")
        .optional(),

  lastLogin : z
              .date()
              .optional(),


});


export type IUser = z.infer<typeof userSchema>;