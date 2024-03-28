const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Handla Bitcoin");
});

module.exports = router;