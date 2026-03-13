import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };