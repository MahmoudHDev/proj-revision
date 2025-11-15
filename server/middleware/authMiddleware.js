import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) { return res.status(401).json({ message: "Not Authorized" }) };
        console.log(token)
        const decoded = jwt.verify(token, "your_jwt_secret")
        // console.log("Token from the server is: " + token)
        // console.log(decoded)
        // req.user = await User.findById(decoded.id).select('-password');
        req.user = { id: decoded.id, email: decoded.email };
        console.log(decoded)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token failed or expired' });
    };
};

export default protect;