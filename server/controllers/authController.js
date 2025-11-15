import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function registerUser(res, req) {
    const { email, password, username } = req.body;
    console.log(req.body)
    try {
        const user = new User({ email, password, username })
        await user.save();
        console.log('User registered:', user)
        return { registered: true, message: 'User registered successfully' };
    } catch (err) {
        console.error('Registration failed:', err.message);
        return { registered: false, message: err.message };
    };
};

export async function loginUser(req, res) {
    console.log(await req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { throw new Error("User wasn't found.") }
        const isMatch = await user.isValidPassword(password);   // this keyword will take the value of passed parameter.
        if (!isMatch) { throw new Error("invalid password") }

        const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", { expiresIn: '1h' });

        res.status(200).header('token', token).json({
            success: true,
            message: "login successfully!",
            token: token,
            user: {
                username: user.username || "NaN",
                email: user.email || "NaN@test.com"
            }
        });
        console.log(user);
        console.log('Login successful!');
    } catch (err) {
        res.status(401).send({ success: false, message: "Error while login in." });

        console.log("Error during login: ", err.message);
    };
};

export const logoutUser = async (req, res) => {

    res.send("User has been signed out successfully.");

}