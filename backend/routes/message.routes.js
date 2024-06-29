import { Router } from "express";
// import { login, signup } from "../controllers/user.controller.js";
import { getPastMessages } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/pastMessages", getPastMessages)
// userRouter.post("/auth/login", login).post("/auth/signup", signup);

export default messageRouter;
