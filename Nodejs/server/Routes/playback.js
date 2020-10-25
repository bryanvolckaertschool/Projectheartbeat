const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");
const router = express.Router();
const axios = require("axios");
const flog = require("../Modules/flog");
var i = 0;
var errors = 0;
var timer;

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
      let boxId = await getboxid(UserID);
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
      flog(`${error}`);
    }
  }
}

async function playmusic(songArray, boxId) {
  clearTimeout(timer);


  if (errors < 10) {
    flog(`starting after error: ${errors}`);

    try {
      

      const url = `http://${process.env.yasip}:3000/device/${boxId}/playMedia`; 
      axios
        .post(
          url,
          [
            {
              mediaType: "MP3",
              mediaUrl: `http://${process.env.yasip}:256/${songArray[i].Id}.mp3`,
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
        flog(
          `start music playback for song: ${songArray[i].Id} on box: ${boxId}`
        );
        timer = setTimeout(playmusic, songArray[i].duration * 1000);
        i++;
      }
    } catch (error) {
      if (songArray[i] == undefined) {
        i = 0;
        //playmusic()
      } else {
        flog(`${error}`);
      }
    }
  }
}

function getboxid(UserID) {
  return new Promise((resolve) => {

      let sql = "SELECT *  FROM users WHERE personid = " + UserID + "";

      connection.query(sql, async (err, result) => {
        if (err) return res.status(400).send(err);

        result.forEach(function (row) {
            flog(`Found box with id: ${row.boxid}`);
            boxid = row.boxid;
            resolve(boxid);
          });
      });   
  });
}

function playbackerror(error) {
  if (errors > 10) {
    flog("Giving up playback does not work even after 10 tries");
    return;
  }
  errors++;
  flog(
    `Unable to play music retrying... and waiting 1 minute number of errors: ${errors}`
  );
  timer = setTimeout(playmusic, 60 * 60 * 10);
  if (errors == 0) {
    i = i - 1;
  }
}

function responsehandeling(response) {
  flog(response.data);
  if (response.data.connection == "not found") {
    playbackerror(response.data.connection);
  } else if (response.data.response == "ok") {
    //flog(response.data);
    errors = 0;
  } else {
    i = 0;
    errors = 0;
    playmusic();
  }
}
