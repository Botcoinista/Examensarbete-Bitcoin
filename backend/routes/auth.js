const express = require("express");
const router = express.Router();
const { hash, compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken");
// Importing the User model
const User = require("../models/user");
// Importing the helper functions for creating and sending tokens
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/tokens");


// SIGNUP REQUEST
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // Check if the user already exists
    const userExists = await User.findOne({ email: email });
    // console.log(userExists);

    //if user already exists
    if (userExists) {
      return res.status(500).json({
        message: "User already exists!",
        type: "warning",
      });
    }
    // If user doesnt exist, create a new user
    /* Hashing the password, the second argument determines how secure the hash is,
           with a higher number making it harder for attackers to guess the password. */
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
    });
    // Save the user to the database
    await newUser.save();
    // Send a success response
    res.status(200).json({
      message: "User created successfully! 🥳",
      type: "success",
    });
  } catch (error) {
      res.status(500).json({
          message: "Error creating user!",
          type: "error",
          error,
        });
        console.log("Error creating user:", error)
  }
});


// LOGIN REQUEST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(500).json({
        message: "User does not exist! 😢",
        type: "error",
      });
    // If user exists, check if the password is correct
    const isMatch = await compare(password, user.password);

    // If the password is incorrect
    if (!isMatch)
      return res.status(500).json({
        message: "Password is incorrect! ⚠️",
        type: "error",
      });

    // If the user's password is correct, generate access and refresh tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);


    // Put the new refresh token in the database
    user.refreshToken = refreshToken;
    /* Saves the user to the database to update the refreshToken field.
     This ensures that the latest refresh token is stored for the user's session management */
    await user.save();

    // Send the response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);

  } catch (error) {
    res.status(500).json({

      message: "Error signing in!",
      type: "error",
      error,
    });
  }
});


// LOGOUT REQUEST
router.post("/logout", (_req, res) => {
    // Clear cookies
    res.clearCookie("refreshToken");
    return res.json({
        message: "Logged out successfully! 🤗",
        type: "success",
    });
})


// REFRESH TOKEN REQUEST
router.post("/refresh_token", async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        // If there is no refresh token in the cookies, return an error
        if (!refreshToken) 
            return res.status(500).json({
                message: "No refresh token! 🤔",
                type: "error",
            });
        // If there is a refresh token, verify it
        let id
        try {
            id = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).id;
        }   catch (error) {
            return res.status(500).json({
                message: "Invalid refresh token! 🤔",
                type: "error",
            });
        }
        // If refresh token is invalid, return error
        if (!id)
            return res.status(500).json({
                message: "Invalid refresh token 🤔",
                type: "error",
        });
        // If the refresh token is valid, check if the user exists
        const user = await User.findById(id);
        if (!user)
            return res.status(500).json({
                message: "User not found! 😢",
                type: "error",
            });
        // If the user exists, check if the refresh token is valid, return error if it is incorrect
        if (user.refreshToken !== refreshToken)
            return res.status(500).json({
                message: "Invalid refresh token! 🤔",
                type: "error",
            });
        // If the refresh token is valid, generate a new tokens
        const accessToken = createAccessToken(user._id);
        const newRefreshToken = createRefreshToken(user._id);
        // Update the refresh token in the database
        user.refreshToken = newRefreshToken;
        // Send the new tokens as response
        sendRefreshToken(res, newRefreshToken);
        return res.json({
            accessToken,
            message: "Tokens refreshed successfully! 🥳",
            type: "success",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error refreshing token! 😢",
            type: "error",
            error,
        });
    }
});




module.exports = router;
