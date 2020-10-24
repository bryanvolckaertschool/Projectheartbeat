const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");

const router = express.Router();

//Globale variablen <===BAD CODE
//const songarray = []
//var boxid;
var i = 0;
var errors = 0;
var timer;
var userid;

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeats Playback API");
});

router.post("/start", verify, (req, res) => {
  let UserID = connection.escape(req.body.id);

  let sql = "SELECT * FROM muziek WHERE personid = " + UserID + "";

  connection.query(sql, async (err, result) => {
    if (err) return res.status(400).send(err);

    if (result != undefined) {
      let songArray = [];
      result.forEach(function (row) {
        songArray.push(new music(row.songid, row.duratie));
      });
      let boxId = await getboxid();
      playmusic(songArray, boxId);
      res.status(200).send(songArray);
    }
  });
});

module.exports = router;

class music {
  constructor(id = "empty", duration) {
    try {
      this.Id = id;
      let splitted = duration.split(":");
      let seconds = parseInt(splitted[1]) + parseInt(splitted[0]) * 60;
      this.duration = seconds;
    } catch (error) {
      console.log(`${error}`);
    }
  }
}

async function playmusic(songArray, boxId) {
  clearTimeout(timer);

  if (errors < 10) {
    console.log(`starting after error: ${errors}`);

    try {
      

      const url = `http://192.168.8.17:3000/device/${boxId}/playMedia`; //CHANGEME STATICIP
      axios
        .post(
          url,
          [
            {
              mediaType: "MP3",
              mediaUrl: `http://192.168.8.17:256/${songarray[i].Id}.mp3`, //CHANGEME STATICIP
            },
          ],
          {
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
            },
          }
        )
        .then((response) => responsehandeling(response))
        .catch((error) => playbackerror(error));
      if (errors == 0) {
        console.log(
          `start music playback for song: ${songarray[i].Id} on box: ${boxId}`
        );
        timer = setTimeout(playmusic, songarray[i].duration * 1000);
        i++;
      }
    } catch (error) {
      if (songarray[i] == undefined) {
        i = 0;
        //playmusic()
      } else {
        console.log(`${error}`);
      }
    }
  }
}

function getboxid() {
  return new Promise((resolve) => {
    try {
      con.connect(function (err) {
        con.query(`SELECT *  FROM users WHERE personid = ${userid}`, function (
          err,
          result,
          fields
        ) {
          result.forEach(function (row) {
            console.log(`Found box with id: ${row.boxid}`);
            boxid = row.boxid;
            resolve("resolved");
          });
          //res.json(ok)
        });
      });
    } catch (error) {
      res.sendStatus(404);
      console.log(`${error}`);
    }
  });
}

function playbackerror(error) {
  if (errors > 10) {
    console.log("Giving up playback does not work even after 10 tries");
    return;
  }
  errors++;
  console.log(
    `Unable to play music retrying... and waiting 1 minute number of errors: ${errors}`
  );
  timer = setTimeout(playmusic, 60 * 60 * 10);
  if (errors == 0) {
    i = i - 1;
  }
}

function responsehandeling(response) {
  console.log(response.data);
  if (response.data.connection == "not found") {
    playbackerror(response.data.connection);
  } else if (response.data.response == "ok") {
    console.log(response.data);
    errors = 0;
  } else {
    i = 0;
    errors = 0;
    playmusic();
  }
}
