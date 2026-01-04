import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getRefreshToken = (tokenData) => {
    return jwt.sign({
        id: tokenData.id,
        email: tokenData.email,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}
const getAccessToken = (tokenData) => {
    return jwt.sign({
        id: tokenData.id,
        email: tokenData.email,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}
export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result=await User.create({
            fullName,
            email,
            password: hashedPassword,
            
        });
        const userData = {
            id: result._id,
            email: result.email,
        }

        const refreshToken = getRefreshToken(userData);
         const accessToken = getAccessToken(userData);
        

        res.cookie("token", refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' });
        res.status(201).json({
            message: "Account Created Successfully.",
            success: true,
            token:accessToken,
        })
    } catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password ) {
            return res.status(400).json({ message: "All fields are required " });
        };
        const user = await User.findOne({ email });
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
        res.cookie("token", refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true,secure:true ,sameSite: 'Strict' });

        res.status(201).json({
            message: "Logged in Successfully.",
            success: true,
            token: accessToken,
            user: {
                id: user._id,
                email: user.email,
                createdAt: user.createdAt,
            },
        }) 
        
    } catch (error) {
        console.log(error);
    }
}



export const logout = (req, res) => {
    try {
        res.status(200).clearCookie("token");
     res.status(200).json({message: "Logged out Successfully."}) 
    } catch (error) {
        console.log(error);
    }
}

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const accessToken = getAccessToken(decoded);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};