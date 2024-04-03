const express = require("express");
const router = express.Router();
const { hash } = require("bcryptjs");
// Importing the User model
const User = require("../models/user");

// Signup request
router.post("/signup", async (req,res) => {
    try {
        const { email, password, username } = req.body;
        // Check if the user already exists
        const userExists = await User.findOne({ email: email});
        console.log(userExists);

        //if user already exists
        if (userExists) {
            return res.status(500).json({ message: "User already exists!", type: "warning" });
        }
        // If user doesnt exist, create a new user
        /* Hashing the password, the second argument determines how secure the hash is,
           with a higher number making it harder for attackers to guess the password. */
        const hashedPassword = await hash(password, 10);
        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username
        });
        // Save the user to the database
        await newUser.save();
        // Send a success response
        res.status(200).json({ message: "User created successfully! 🥳", type: "success" });
    } catch (error) {
        type: "error",
        res.status(500).json({ message: "Error creating user!", type: "error" });
        error
    }
})




module.exports = router;


