const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");

const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeats API");
});

router.post("/create", verify, (req, res) => {
  console.log("create request");

  let Naam = connection.escape(req.body.Naam);
  let SpeakerID = connection.escape(req.body.SpeakerID);
  let baseHartslag = connection.escape(req.body.baseHartslag);
  let baseSPO2 = connection.escape(req.body.baseSPO2);
  let typeDementie = connection.escape(req.body.typeDementie);

  let sql =
    "INSERT INTO users (Naam, boxid, baseHartslag, baseSPO2, typeDementie) VALUES (" +
    Naam +
    ", " +
    SpeakerID +
    ", " +
    baseHartslag +
    ", " +
    baseSPO2 +
    ", " +
    typeDementie +
    ")";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      //niet nodig want res.json doet dit ook al
      //res.end();
    }
    res.status(200).send(result);
  });
});

router.post("/delete", verify , (req, res) => {
  console.log("Delete request gemaakt");

  let PersonID = connection.escape(req.body.PersonID);

  let sql = "DELETE FROM users WHERE " + "personid = " + PersonID;

  console.log(sql);

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(400).send(err);
      //niet nodig want res.json doet dit ook al
      //res.end();
    }
    res.status(200).send(result);
  });
});

router.get("/showall", verify, (req, res) => {
  console.log("Get all gemaakt!");

  let sql = "SELECT * FROM users";

  connection.query(sql, (err, result) => {
    if (err) res.json(err);

    res.json(result);
  });
});

router.post("/show", verify, (req, res) => {
  let PersonID = connection.escape(req.body.PersonID);

  let sql = "SELECT * FROM users WHERE personid = " + PersonID + "";

  connection.query(sql, (err, result) => {
    if (err) res.json(err);

    res.json(result);
  });
});

module.exports = router;
