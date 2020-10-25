const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");
const router = express.Router();
const axios = require("axios");
const flog = require("../Modules/flog");

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeats Playback API");
});

router.post("/add", verify ,(req,res) => {
    let RustHuisNaam = connection.escape(req.body.RustHuisNaam);
    let RootUserNaam = connection.escape(req.body.RootUserNaam);
    let RootUserPSWD = connection.escape(req.body.RootUserPSWD);
    let sql =`CREATE DATABASE ${RustHuisNaam};`;
    connection.query(sql, (err, result) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(result);
    });
    let sql1 =`USE ${RustHuisNaam};`;
    connection.query(sql1, (err, result) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(result);
    });
    let sql2 =`CREATE USER ${RootUserNaam}@% IDENTIFIED BY ${RootUserPSWD};`;
    connection.query(sql2, (err, result) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(result);
    });
    let sql3 =`GRANT ALL privileges on database1.* to ${RootUserNaam}@%;`;
    connection.query(sql3, (err, result) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(result);
    });
    let sql4 =`FLUSH PRIVILEGES;`;
    connection.query(sql4, (err, result) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(result);
    });
});

module.exports = router;