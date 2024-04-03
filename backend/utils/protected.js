const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const protected = async (req, res, next) => {
  // Get the token from the header
  const authorization = req.headers["authorization"];
  // If we don´t have a token, return an error
  if (!token)
    return res.status(500).json({
      message: "There is no token 🤔",
      type: "error",
    });
  // If we have a token, we need to verify it.
  /* Splits the token into two parts: "Bearer" and the token itself,
     [1] to access the second element of the array, which represents the token. */
  const token = authorization.split(" ")[1];
  let id;
  try {
    id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
  } catch {
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }
  // If the token is invalid, return an error
  if (!id)
    return (
      res.status(500),
      json({
        message: "Invalid token! 🤔",
        type: "error",
      })
    );
  // If the token is valid, check if the user exists
  const user = await User.findById(id);
  // If the user does not exist, return an error
  if (!user)
    return res.status(500).json({
      message: "User doesn't exist! 😢",
      type: "error",
    });
  // If the user exists, we'll add a new field "user" to the request object
  req.user = user;
  // Call the next middleware
  next();
};

module.exports = { protected };
