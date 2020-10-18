const mysql = require("mysql");

//Creëer db connectie
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Heartbeats",
  });
  
  //effectief connecteren
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connectie met Database Succesvol!");
  });

  module.exports = connection