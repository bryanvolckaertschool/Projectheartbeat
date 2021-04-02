const mysql = require("mysql");
var db_config = {
  host: "bsaoc.be",
  user: "root",
  password: "LjAU528fL)Gu^P]&",
  database: "Projectheartbeat",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 6000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
    console.log("ik ben done")
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = connection;

// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "94.110.139.152",
//   user: "PHDBserver",
//   password: "Melvispelvis",
//   database: "Projectheartbeat",
// });

// //effectief connecteren
// connection.connect((err) => {
//   if (err) {
//     console.log(err)
//     throw err;
//   }
//   console.log("Connectie met Database Succesvol!");
// });

// module.exports = connection;
