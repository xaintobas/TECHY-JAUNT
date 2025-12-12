import express, { Router } from "express";
import { signup } from "../controllers/userAuthController.js";

const userAuthRouter = Router();

userAuthRouter.post("/signup", signup);

export default userAuthRouter;
