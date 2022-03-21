import express from "express";
const router = express.Router();


import {
    loginSuperAdmin,
    logout
} from "../controllers"

// import {
//     CreatUserValidator,
//     Auth
// } from "../middlewares"

router.post("/login", loginSuperAdmin)
router.get("/logout", logout)
export { router }