import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import transporter from "../config/mail.config.js"

class AuthController {

    async register(req, res) {

    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const verificationToken = crypto.randomBytes(32).toString("hex")

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        verificationToken
    })

    const verificationLink = `http://localhost:8080/api/auth/verify/${verificationToken}`

    await transporter.sendMail({
        to: email,
        subject: "Verify your account",
        html: `
            <h2>Verify your account</h2>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationLink}">
                <button>Verify Account</button>
            </a>
        `
    })

    res.json({ message: "User created. Check your email to verify." })
}

    async login(req, res) {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" })
        }

        if (!user.isVerified) {
            return res.status(401).json({
            message: "Please verify your email first"
                })
            }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            token,
            user
        })

    }

async verifyEmail(req, res) {
    try {
        const { token } = req.params;

        // Buscamos el usuario por el token de verificación
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send("Invalid or expired token");
        }

        // Activamos al usuario
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        // Redirigimos al frontend
        // En desarrollo localhost:5173, en producción reemplazar con tu dominio real
        const frontendURL = process.env.NODE_ENV === "production"
            ? "https://miapp.com/login?verified=true"
            : "http://localhost:5173/login?verified=true";

        return res.redirect(frontendURL);

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("Server error");
    }
}

}

export default new AuthController()