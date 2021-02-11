const mysql = require("mysql2");

//Creëer db connectie
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "Heartbeats",
//   });

// const connection = mysql.createConnection({
//   host: "94.110.139.152",
//   user: process.env.DB_USR,
//   password: process.env.DB_PWD,
//   database: "Projectheartbeat",
// });

const connection = mysql.createConnection({
  host: "94.110.139.152",
  user: "PHDBserver",
  password: "Melvispelvis",
  database: "Projectheartbeat",
});

connection.on('error', (err) => {
    if(err){ console.log(err);mysql.createConnection({
  host: "94.110.139.152",
  user: "PHDBserver",
  password: "Melvispelvis",
  database: "Projectheartbeat",
});}
});

// //effectief connecteren
// connection.connect((err) => {
//   if (err) {
//     console.log(err)
//     throw err;
//   }
//   console.log("Connectie met Database Succesvol!");
// });

module.exports = connection;
