import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = process.env.SECRET_KEY || 'challanarendhrakumar2005';

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        const existingUser = await User.findOne({ email }).select("-password");
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};

const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
};

export { Login, SignUp, checkAuth };
