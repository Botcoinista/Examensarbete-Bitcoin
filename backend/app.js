require ("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const bitcoinInfluencersRouter = require("./routes/bitcoin-influencers");
const guiderRouter = require("./routes/guider");
const handlaBitcoinRouter = require("./routes/handla-bitcoin");
const nyheterRouter = require("./routes/nyheter");
const omRouter = require("./routes/om");
const podcastsRouter = require("./routes/podcasts");


const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/bitcoin-influencers", bitcoinInfluencersRouter);
app.use("/guider", guiderRouter);
app.use("/handla-bitcoin", handlaBitcoinRouter);
app.use("/nyheter", nyheterRouter);
app.use("/om", omRouter);
app.use("/podcasts", podcastsRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
    });



    