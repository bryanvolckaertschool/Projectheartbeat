const mysql = require("mysql");

//Creëer db connectie
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "Heartbeats",
//   });

const connection = mysql.createConnection({
  host: "94.110.139.152",
<<<<<<< HEAD
  user: "ProjectHeartbeatAPI",
  password: "123",
=======
  user: "Projectheartbeatsql",
  password: "MelvisPelvis",
>>>>>>> 24d3a61e0d41b55ea078d4a62b262751f0774330
  database: "ProjectheartbeatTemp",
});

//effectief connecteren
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connectie met Database Succesvol!");
});


module.exports = connection;