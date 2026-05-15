import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: "Male" | "Female" | "Other";
  DOB: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
