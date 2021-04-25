const express = require("express");
const connection = require("../Modules/db");
const verify = require("./verifyToken");
const router = express.Router();
const axios = require("axios");
const flog = require("../Modules/flog");

//Routes
router.get("/", (req, res) => {
  res.send("Hello from the Project Heartbeats Playback API");
});

router.post("/meting", (req, res) => {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body)
  // let PersonID = connection.escape(req.body.PersonID);
  // let curHartslag = connection.escape(req.body.curHartslag);
  // let curSPO2 = connection.escape(req.body.curSPO2);

  // let sql = "SELECT * FROM users WHERE personid = " + PersonID;

  // connection.query(sql, async (err, result) => {
  //   if(err) return res.status(400).send(err);

  //   if(result != undefined) {
  //     let baseHartslag =  result[0].baseHartslag;
  //     let baseSPO2 = result[0].baseSPO2;
  //     let Stress = stress(baseHartslag, baseSPO2, curHartslag, curSPO2)
  //     flog(`eeftem stress?: ${Stress}`)
  //     if(Stress)
  //     {
       
  //       flog("starting playback person has stress")
  //       Startplayback(PersonID);
  //     }
       res.status(200).send("Person Found");
  //   }
  //   else{
  //     res.status(400).send("User not found");
  //   }
  // });
});

function stress(basehartslag, basespo2, curhartslag, curspo2) {
  let Stress = false
  let maxallowedhb = process.env.maxallowedHB;
  let maxallowedspo2 = process.env.maxallowedSPO2;
  flog(`eeftem stress?: ${curhartslag/maxallowedhb > basehartslag}`)
   flog(`eeftem stress?: ${curspo2 * maxallowedspo2 < basespo2}`)
  if(curhartslag/maxallowedhb > basehartslag){
    Stress = true
  } 
  else if(curspo2 * maxallowedspo2 < basespo2){
    Stress = true
  }
  return Stress
}


async function Startplayback(PersonID) {
  var postData = {
    PersonID : `${PersonID}`
  };
  flog(`your postdata: ${postData}`)
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "auth-token": `${process.env.authtoken}`,    
      }
  };
  flog(`your headers: ${axiosConfig}`)
  const url = `http://${process.env.apiip}:8000/playback/start`; 
  axios.post(url, postData, axiosConfig)
  .then((res) => {
    //console.log("RESPONSE RECEIVED: ", res);
  })
  .catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}

module.exports = router;