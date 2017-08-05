//Dependencies
let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let expressLogging = require("express-logging");
let logger = require("logops");
let cors = require("cors");

//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/leaderboardDB", { useMongoClient: true });

//Express
let app = express();
let port = 3000;
app.use(cors({ origin: "http://localhost:8080" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Logging
app.use(expressLogging(logger));


//Routes
app.use("/api", require("./routes/api"));
app.put("/addWeek", (req, res, error) => {
    mongoose.collection("trainers").findOneAndUpdate({ name: req.name }, { $push: { feedback: req.feedback } });
    if (error) {
        return res.send("error", error);
    }
});

//Starting Server
app.listen(port);
console.log(`Running on ${port}`); 