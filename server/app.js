import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MongoDB:
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("connection works.")
})

app.listen(PORT, () => {
    console.log("App started listening on port: " + PORT)
});