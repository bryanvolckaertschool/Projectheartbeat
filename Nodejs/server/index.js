const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./Modules/db");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Middleware routes
const api = require("./Routes/api.js");
app.use("/api", api);

const auth = require("./Routes/auth.js");
app.use("/auth", auth);

const playback = require("./Routes/playback.js");
app.use("/playback",playback);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("Project Heartbeats server gestart op poort: " + port);
});
