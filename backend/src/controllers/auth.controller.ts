import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";
import { AuthRequest } from "../types";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    await registerService(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    const status = error.message === "User already exists" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, user } = await loginService(req.body);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user });
  } catch (error: any) {
    const status = error.message === "Invalid email or password" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const verifyUser = (req: AuthRequest, res: Response): void => {
  res.status(200).json({ user: req.user });
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({ user: req.user });
};
