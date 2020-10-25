const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../Modules/db");
const verify = require("./verifyToken");

//Validatie
const joi = require("@hapi/joi");

//Environment variabelen
dotenv.config({ path: __dirname + "/../.env" });

//Validatie schema maken voor registreren
const schemaRegister = joi.object({
  Naam: joi.string().min(3).required(),
  Email: joi.string().min(3).required().email(),
  Wachtwoord: joi.string().min(3).required(),
});

//Validatie schema maken voor registreren
const schemaLogin = joi.object({
  Email: joi.string().min(3).required().email(),
  Wachtwoord: joi.string().min(3).required(),
});

//Express router
const router = express.Router();

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeat AUTH");
});

router.post("/register", (req, res) => {
  //Valideer de data voordat we een gebruiker registreren

  const validation = schemaRegister
    .validateAsync(req.body)
    .then((value) => {
      let Naam = connection.escape(value.Naam);
      let Email = connection.escape(value.Email);
      let Wachtwoord = connection.escape(value.Wachtwoord);

      //Hash password genereren
      bcrypt.hash(Wachtwoord, 10, (err, hash) => {
        if (err) throw err;
        let sql =
          "INSERT INTO Admins (Naam, Email, Wachtwoord) VALUES (" +
          Naam +
          ", " +
          Email +
          ", '" +
          hash +
          "')";

        connection.query(sql, (err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(value);
          }
        });
      });
    })
    .catch((err) => {
      res.status(400).send(err.details[0].message);
    });
});

router.post("/login", async (req, res) => {
  const validationObject = await schemaLogin.validate(req.body);
  console.log(req.body)
  console.log(validationObject)
  if (validationObject.error)
    return res.status(400).send(validationObject.error.details[0].message);
  
  let Email = connection.escape(req.body.Email);
  let Wachtwoord = connection.escape(req.body.Wachtwoord);

  let sql =
    "SELECT Naam, Email, Wachtwoord FROM admins WHERE Email =" + Email;
  
  const login = connection.query(sql, (err, result) => {
    if (err) return res.status(400).send(err);
    if (Object.keys(result).length === 0)
      return res.status(400).send("Verkeerde Email");

    const verglijk = bcrypt.compare(
      Wachtwoord,
      result[0].Wachtwoord,
      (err, same) => {
        if (err) return res.status(400).send(err);
        if (same) {
          //Creëer een geef een JWT token
          const token = jwt.sign(
            { Naam: result[0].Naam },
            process.env.TOKEN_SECRET
          );
          return res.header("auth-token", token).status(200).send(token);
        } else return res.status(400).send("Not the same");
      }
    );
  });
});

router.delete("/delete", (req, res) => {
    let ID = connection.escape(req.body.ID);

    let sql =
      "DELETE FROM admins WHERE " + "ID =" + ID;
  
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

  let sql = "SELECT * FROM admins";

  connection.query(sql, (err, result) => {
    if (err) res.json(err);

    res.json(result);
  });
});

module.exports = router;
