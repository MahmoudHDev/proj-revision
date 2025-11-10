import express from 'express';
import connectDB from './mongoConfig.js';
import cors from 'cors';
import User from './models/UserModel.js'
const app = express();
const PORT = 5001;
const someOtherPlaintextPassword = 'jsut_any_word';
app.use(cors());
app.use(express.json());

// MongoDB:


connectDB();


const registerUser = async (email, password, username) => {
    try {
        const user = new User({ email, password, username })
        await user.save();
        console.log('User registered:', user)
    } catch (err) {
        console.error('Registration failed:', err.message);
    };

};

app.get('/', (req, res) => {
    res.send("Hello from the server")
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    console.log("Data received from client: ", req.body);
    console.log("email: ", email);
    console.log("password: ", password);
    registerUser(email, password, "Testusername")

});

app.listen(PORT, () => {
    console.log("App started listening on port: " + PORT)
});