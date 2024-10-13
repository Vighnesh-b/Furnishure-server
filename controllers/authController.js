import { UserModel as User } from '../models/user.js';
import { hashPassword,comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';


const test = (req, res) => {
    res.json('test is working');
}

//register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.json({ error: 'Name is required' });
        }
        if (!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword=await hashPassword(password)

        const user = await User.create({
            name, email, password:hashedPassword,
        });

        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET
            );
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }).json(user);
        } else {
            return res.json({
                error: 'Passwords do not match'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProfile = (req, res) => {
    const token = req.cookies.token; 
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.json(null);
            }
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

const logoutUser = (req, res) => {
    try {
        const token = req.cookies.token;

        if (token) {
            res.clearCookie('token');
            res.json({ message: 'User logged out successfully' });
        } else {
            res.json({ message: 'No user logged in' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { test, registerUser,loginUser,getProfile,logoutUser};
