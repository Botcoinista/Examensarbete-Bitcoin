const { sign } = require('jsonwebtoken');

// Retrieve the secret keys for signing JWT tokens from environment variables
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Signing the access token
const createAccessToken = (id) => {
    return sign({ id }, accessTokenSecret, {
        expiresIn: "15" // 15 minutes
    });
}

// Signing the refresh token
const createRefreshToken = (id) => {
    return sign({ id }, refreshTokenSecret, {
        expiresIn: '90d', // 7 days
    });
}

// Sending the access token to the client
const sendAccessToken = ( _req, res, accesstoken) => {
    res.send({
        accesstoken,
        message: "Sign in was Successful 🥳",
        type: "success"
    });
}

// Sending the refresh token to the client as a cookie
const sendRefreshToken = ( res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
    });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}