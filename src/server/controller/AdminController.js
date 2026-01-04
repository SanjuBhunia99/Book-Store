import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../model/AdminModel.js';

const getRefreshToken = (tokenData) => {
    return jwt.sign({
        id: tokenData.id,
        email: tokenData.email,
        isAdmin: true,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}
const getAccessToken = (tokenData) => {
    return jwt.sign({
        id: tokenData.id,
        email: tokenData.email,
        isAdmin: true,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password ) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const userData = {
            id: user._id,
            email: user.email,
        }

       const refreshToken = getRefreshToken(userData);
        const accessToken = getAccessToken(userData);
        
res.cookie("token", refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict",
});

        res.status(201).json({
            message: "Logged in Successfully.",
            success: true,
            token: accessToken,
            user: {
                id: user._id,
                email: user.email,
            },
        }) 
        
    } catch (error) {
        console.log(error);
    }
}

export const adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await Admin.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Username Already exist try different",
                success: false
            })
        };
        const result = await Admin.create({
            email,
            password: hashedPassword,
        });
                   
        res.status(201).json({
            message: "Admin Registered Successfully.",
            success: true,
            user: result,              
        })
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
res.status(200).json({ message: "Logged out Successfully." });
    } catch (error) {
        console.log(error);
    }
}