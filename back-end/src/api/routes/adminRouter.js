import express from "express";
const router = express.Router();


import {
    loginAdmin,
    logout
} from "../controllers"

import {
    CreatUserValidator,
    Auth
} from "../middlewares"

router.post("/login", loginAdmin)
router.get("/logout", logout)
export { router }