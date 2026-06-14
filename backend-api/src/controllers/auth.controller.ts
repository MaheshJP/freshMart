import bcrypt from "bcryptjs";
import User from "../models/login";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const Register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existanceUser = await User.findOne({ email });
        if (existanceUser) {
            return res.status(400).json({
                status: 'error',
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            status: 'success',
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating user', error
        });
    }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" });    
        res.status(200).json({
            status: 'success',
            message: "Login successful",
            data: user,
            token
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error logging in user', error
        });
    }
};
export const authenticate = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};