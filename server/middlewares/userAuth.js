import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'challanarendhrakumar2005');
        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default userAuth;
