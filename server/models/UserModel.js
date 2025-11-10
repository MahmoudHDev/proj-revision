import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    password: { type: String, required: true, minlength: 5 },
    username: { type: String, unique: true, lowercase: true },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function (next) {
    try {
        // Check if the password has been modified
        if (!this.isModified('password')) return next();
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Proceed to save
    } catch (err) {
        console.log("Error")
        next(err)  // Pass any errors to the next middleware
    };
});

// Creating the Password Validation Method
UserSchema.methods.isValidPassword = async (password) => {
    try {
        // Compare provided password with stored hash
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error('Password comparison failed');
    };
};


// Model
// A model is a class with which we construct documents
const User = mongoose.model("User", UserSchema);

export default User;