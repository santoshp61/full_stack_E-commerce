import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            success: true,
            token,
        });
    } else {
        res.json({
            success: false,
            message: "Invalid admin credentials",
        });
    }
});

export default router;