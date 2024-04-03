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
            return res.status(500).json({
                 message: "User already exists!",
                  type: "warning" 
            });
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
        res.status(200).json({
             message: "User created successfully! 🥳",
              type: "success" 
            });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ 
            message: "Error creating user!",
             type: "error",
             error
        });
    }
})


// const { hash, compare } = require("bcryptjs");

// // Importing the helper functions for creating and sending tokens
// const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require("../utils/tokens");

// // Login request
// router.post("/signin", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // Check if the user exists
//         if (!user) 
//             return res.status(500).json({
//                 message: "User does not exist! 😢",
//                 type: "error"
//             });
//             // If user exists, check if the password is correct
//             const isMatch = await compare(password, user.password);

//             // If the password is incorrect
//             if (!isMatch) 
//                 return res.status(500).json({ 
//                     message: "Passwords doesn´t match ⚠️",
//                      type: "error" 
//                     })

//             // If password is correct, create the tokens
//             const accessToken = createAccessToken(user._id)        
//             const refreshToken = createRefreshToken(user._id)

//             // Put the refresh token in the database
//             user.refreshToken = refreshToken;
//             await user.save();

//             // Send the response
//             sendRefreshToken(res, refreshToken);
//             sendAccessToken(req, res, accessToken);
//         }   catch (error) {
//             res.status(500).json({ 
//                 message: "Error signing in!",
//                 type: "error" 
//             });
//     }
// })



module.exports = router;


