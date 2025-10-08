import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";


const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existing = await userModel.findOneEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = bcrypt.hashSync(password, 10);
    await userModel.create({ email, password: hashed });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOneEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: "Wrong password" });

   const token = jwt.sign({ email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
    

const usuario = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userModel.findOneEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...safe } = user;
    return res.status(200).json(safe);
  } catch (error) {
    next(error);
  }
};

export const userController = {
    login,
    register,
    usuario,
};