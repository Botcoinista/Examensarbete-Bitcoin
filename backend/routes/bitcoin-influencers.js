const express = require("express");
const router = express.Router();

// Define routes relative to '/bitcoin-influencers'
router.get("/", (req, res) => {
    res.send("Bitcoin Influencers!");
});


module.exports = router;
