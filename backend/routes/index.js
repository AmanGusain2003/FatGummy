import {Router} from "express";
import userRouter from "./user.routes.js";


const router = Router();

router
    .get("/",(req, res) => {
        res.send("hello")
    })
    .use("/", userRouter)

export default router;