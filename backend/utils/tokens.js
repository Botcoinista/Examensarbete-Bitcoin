const { sign } = require('jsonwebtoken');

// Signing the access token
const createAccessToken = (id) => {
    return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "15" // 15 minutes
    });
}

// Signing the refresh token
const createRefreshToken = (id) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '90d', // 90 days
    });
}

// Sending the access token to the client
const sendAccessToken = ( _req, res, accesstoken) => {
    res.send({
        accesstoken,
        message: "Login lyckades! 🥳",
        type: "success"
    });
}

// Sending the refresh token to the client as a cookie
const sendRefreshToken = ( res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
    });
}

// password reset token
const createPasswordResetToken = ({ _id, email, password }) => {
    const secret = password;
    return sign({ id: _id, email }, secret, {
      expiresIn: 15 * 60, // 15 minutes
    });
  };
  

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
}