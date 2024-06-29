import { Router } from "express";
import { login, signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/auth/login", login).post("/auth/signup", signup);

export default userRouter;
