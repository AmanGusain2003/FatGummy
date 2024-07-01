import { Router } from "express";
import { login, signup, getPartnerId } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/auth/login", login).post("/auth/signup", signup).get("/auth/partnerId",getPartnerId)

export default userRouter;
