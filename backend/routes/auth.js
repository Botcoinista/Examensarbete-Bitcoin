const express = require("express");
const router = express.Router();
const { hash, compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken");

const User = require("../models/user");

// Importing the helper functions for creating and sending tokens
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/tokens");

const { protected } = require('../utils/protected')

/* GET main auth page. */
router.get('/', async (req, res) => {
	res.send('Hello Express!! 👋, this is Auth end point')
})

// REGISTER REQUEST
router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const { email, password, username } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            message: "Please fill in all fields! 😢",
            type: "error",
        });
    }
    // Check if the user already exists
    const userExists = await User.findOne({ email: email });
    console.log(userExists);

    //if user already exists
    if (userExists) {
      console.log("User already exists!")
      return res.status(500).json({
        message: "Användaren existerar redan!",
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
    console.log("before save", newUser)
    await newUser.save();
    console.log("after save", newUser)
    // Send a success response
    res.status(200).json({
      message: "Registreringen lyckades! 🥳",
      type: "success",
    });
  } catch (error) {
    console.log("catch", error)
    res.status(500).json({
      message: "Error creating user!",
      type: "error",
      error,
    });
    console.log("Error creating user:", error);
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
        message: "Lösenordet stämmer inte! ⚠️",
        type: "error",
      });

    // If the user's password is correct, generate access and refresh tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Put the new refresh token in the database
    user.refreshtoken = refreshToken;
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
  // clear cookies
  res.clearCookie("refreshtoken");
  return res.json({
    message: "Du är nu utloggad! 🤗",
    type: "success",
  });
});

// REFRESH TOKEN REQUEST
router.post("/refresh_token", async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    // If there is no refresh token in the cookies, return an error
    if (!refreshtoken)
      return res.status(500).json({
        message: "No refresh token! 🤔",
        type: "error",
      });
    // If there is a refresh token, verify it
    let id;
    try {
      id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
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
    if (user.refreshtoken !== refreshtoken)
      return res.status(500).json({
        message: "Invalid refresh token! 🤔",
        type: "error",
      });
    // If the refresh token is valid, generate new tokens
    const accessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);
    // Update the refresh token in the database
    user.refreshtoken = newRefreshToken;
    // Send the new tokens as response
    sendRefreshToken(res, newRefreshToken);
    return res.json({
      message: "Tokens refreshed successfully! 🥳",
      type: "success",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error refreshing token! 😢",
      type: "error",
      error,
    });
  }
});

// PROTECTED ROUTE

// protected route
router.get("/protected", protected, async (req, res) => {
  try {
    // if user exists in the request, send the data
    if (req.user)
      return res.json({
        message: "You are logged in! 🤗",
        type: "success",
        user: req.user,
      });
    // if user doesn't exist, return error
    return res.status(500).json({
      message: "You are not logged in! 😢",
      type: "error",
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error getting protected route!",
      error,
    });
  }
});



const { createPasswordResetToken } = require("../utils/tokens");
const {
  transporter,
  createPasswordResetUrl,
  passwordResetTemplate,
  passwordResetConfirmationTemplate,
} = require("../utils/email");
// send password reset email
router.post("/send-password-reset-email", async (req, res) => {
  try {
    // get the user from the request body
    const { email } = req.body;
    // find the user by email
    const user = await User.findOne({ email });
    // if the user doesn't exist, return error
    if (!user)
      return res.status(500).json({
        message: "User doesn't exist! 😢",
        type: "error",
      });
    // create a password reset token
    const token = createPasswordResetToken({ ...user, createdAt: Date.now() });
    // create the password reset url
    const url = createPasswordResetUrl(user._id, token);
    // send the email
    const mailOptions = passwordResetTemplate(user, url);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res.status(500).json({
          message: "Error sending email! 😢",
          type: "error",
        });
      return res.json({
        message: "Password reset link has been sent to your email! 📧",
        type: "success",
      });
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error sending email!",
      error,
    });
  }
});

// reset password
router.post("/reset-password/:id/:token", async (req, res) => {
  try {
    // get the user details from the url
    const { id, token } = req.params;
    // get the new password the request body
    const { newPassword } = req.body;
    // find the user by id
    const user = await User.findById(id);
    // if the user doesn't exist, return error
    if (!user)
      return res.status(500).json({
        message: "User doesn't exist! 😢",
        type: "error",
      });
    // verify if the token is valid
    const isValid = verify(token, user.password);
    // if the password reset token is invalid, return error
    if (!isValid)
      return res.status(500).json({
        message: "Invalid token! 😢",
        type: "error",
      });
    // set the user's password to the new password
    user.password = await hash(newPassword, 10);
    // save the user
    await user.save();
    // send the email
    const mailOptions = passwordResetConfirmationTemplate(user);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res.status(500).json({
          message: "Error sending email! 😢",
          type: "error",
        });
      return res.json({
        message: "Email sent! 📧",
        type: "success",
      });
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error sending email!",
      error,
    });
  }
});



module.exports = router;
