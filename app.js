const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const User = require("./models/User");
const users = require("./routes/api/users");
const businesses = require("./routes/api/businesses");
const reviews = require("./routes/api/reviews");
const upload = require("./routes/api/image_upload");
const passport = require("passport");
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(busboy());
app.use(busboyBodyParser());
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/businesses", businesses);
app.use("/api/reviews", reviews);
app.use("/api/images", upload);

const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});