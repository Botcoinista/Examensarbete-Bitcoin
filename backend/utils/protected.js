const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const protected = async (req, res, next) => {
  // Get the token from the header
  const authorization = req.headers["authorization"];
  console.log("Authorization header:", authorization); // Add this logging statement

  // If we don't have a token, return an error
  if (!authorization) {
    console.log("No token provided."); // Add this logging statement
    return res.status(500).json({
      message: "No token! 🤔",
      type: "error",
    });
  }

  // If we have a token, you have to verify it
  const token = authorization.split(" ")[1];
  let id;
  try {
    id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    console.log("Verified token ID:", id); // Add this logging statement
  } catch (error) {
    console.log("Error verifying token:", error); // Add this logging statement
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }

  // If the token is invalid, return an error
  if (!id) {
    console.log("Invalid token ID."); // Add this logging statement
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }

  // If the token is valid, check if the user exists
  const user = await User.findById(id);
  console.log("User found:", user); // Add this logging statement

  // If the user doesn't exist, return an error
  if (!user) {
    console.log("User not found."); // Add this logging statement
    return res.status(500).json({
      message: "User doesn't exist! 😢",
      type: "error",
    });
  }

  // If the user exists, add a new field "user" to the request
  req.user = user;

  // Call the next middleware
  next();
};

module.exports = { protected };
