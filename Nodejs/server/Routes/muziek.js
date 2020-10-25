const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");

const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeats Music API");
});

router.post("/add", verify ,(req,res) => {
    let PersonID = connection.escape(req.body.PersonID);
    let Naam = connection.escape(req.body.Naam);
    let SongID = connection.escape(req.body.SongID);
    let Duratie = connection.escape(req.body.Duratie);
    
    let sql =
      "INSERT INTO muziek (personid, naam, songid, duratie) VALUES (" +
      PersonID +
      ", " +
      Naam +
      ", " +
      SongID +
      ", " +
      Duratie +
      ")";
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
        //niet nodig want res.json doet dit ook al
        //res.end();
      }
      res.status(200).send(result);
    });
});

router.delete("/delete", (req, res) => {
    let PersonID = connection.escape(req.body.PersonID);
    let SongID = connection.escape(req.body.SongID);

    let sql =
      "DELETE FROM muziek WHERE " + "personid =" + PersonID + " AND songid ="  + SongID;
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
        //niet nodig want res.json doet dit ook al
        //res.end();
      }
      res.status(200).send(result);
    });
});

router.post("/show", verify, (req, res) => {
  let PersonID = connection.escape(req.body.PersonID);

  let sql = "SELECT * FROM muziek WHERE personid = " + PersonID + "";

  connection.query(sql, (err, result) => {
    if (err) res.json(err);

    res.json(result);
  });
});

module.exports = router;