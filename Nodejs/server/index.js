const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


//Middleware
app.use(bodyParser.json());
app.use(cors());

//Middleware routes

const auth = require("./Routes/auth.js");
app.use("/auth", auth);

const muziek = require("./Routes/muziek.js");
app.use("/muziek", muziek);

const playback = require("./Routes/playback.js");
app.use("/playback",playback);

const register = require("./Routes/register.js");
app.use("/register", register);

const users = require("./Routes/users.js");
app.use("/users", users);

const stress = require("./Routes/stress.js");
app.use("/stress", stress);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("Project Heartbeats server gestart op poort: " + port);
});
