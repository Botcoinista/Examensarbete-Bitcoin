const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("request", req)
    console.log("response", res)
    res.send("Home");
});

module.exports = router;