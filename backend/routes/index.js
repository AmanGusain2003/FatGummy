import {Router} from "express";
import userRouter from "./user.routes.js";
import messageRouter from "./message.routes.js";


const router = Router();

router
    .get("/",(req, res) => {
        res.send("hello")
    })
    .use("/", userRouter)
    .use("/chat", messageRouter)

export default router;