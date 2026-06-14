import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/userRepository";

const repo = new UserRepository();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await repo.findByEmail(email);

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await repo.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch {
    return res.status(500).json({
      error: "Internal error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await repo.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Internal error",
    });
  }
};