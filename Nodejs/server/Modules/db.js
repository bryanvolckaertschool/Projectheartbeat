const mysql = require("mysql");

//Creëer db connectie
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "Heartbeats",
//   });

const connection = mysql.createConnection({
  host: "94.110.140.22",
  user: "projectHeartBeatAPI",
  password: "BryVin2020",
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
