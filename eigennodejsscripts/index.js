const express = require('express');
const app = express()
const fetch = require("node-fetch");
var mysql = require('mysql');
const axios = require('axios')
const songarray = []
var boxid
var i = 0
var errors = 0
var timer
var ok = {response : 'lookupOK'}
var con = mysql.createConnection({
  host: "localhost",//CHANGEME
  user: "root",//CHANGEME
  password: "Bryana2017",//CHANGEME
  database: "testdatabase"//CHANGEME
});






app.get('/startplayback/:id',(req, res) => {
	try{
		con.connect(function(err) {
			con.query(`SELECT *  FROM Persoonelijkeliedjes WHERE personid = ${req.params.id}`, function (err, result, fields) {
		    	result.forEach(function(row){
		    		console.log(`adding: ${row.songid} with duration of ${row.duratie} to queu`)
		    		musicobj = new music(row.songid,row.duratie)	
		    		songarray.push(musicobj) 
		    		boxid = row.Boxid			
		 		} )
		 		playmusic()
		 		res.json(ok)
			});
		});
	}
	catch{
		res.sendStatus(404)
		console.log(`${error}`)
	}
})
var port = 8000

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.8.17:${port}`)
})

class music {
	constructor(id = 'empty',duration){
		try {
			this.Id = id
			let splitted = duration.split(':')
			let seconds = parseInt(splitted[1]) + (parseInt(splitted[0]) * 60)
			this.duration =  seconds
		}catch (error){
			console.log(`${error}`)
		}

	}
}

function playmusic(){
	clearTimeout(timer)
	if(errors < 10){
		console.log(`starting after error: ${errors}`)
	}
	try{
	
			const url = `http://192.168.8.17:3000/device/${boxid}/playMedia`//CHANGEME STATICIP
			axios
				.post(url,[{
					mediaType: 'MP3', mediaUrl: `http://192.168.8.17:256/${songarray[i].Id}.mp3`//CHANGEME STATICIP
				}],{
					headers:{'accept': 'application/json', 'content-Type': 'application/json'}
				} ).then(
					response => responsehandeling(response)
				).catch(
					error =>  playbackerror(error)
				)
		if(errors == 0){
			console.log(`start music playback for song: ${songarray[i].Id} on box: ${boxid}`)
			timer = setTimeout(playmusic, songarray[i].duration *1000)
			i++
		}	
		
	}
	catch(error){
		if(songarray[i] == undefined){
			i = 0
			playmusic()
		}
		else{
			console.log(`${error}`)
		}
		//console.log('Kben klaar gekomen xo')
	}
}

function playbackerror(error){
	if(errors > 10){
		console.log('Giving up playback does not work even after 10 tries')
		return
	} 
	errors++
	console.log(`Unable to play music retrying... and waiting 1 minute number of errors: ${errors}`);
	timer = setTimeout(playmusic, 60* 60 * 1000);
	
	//i = i - 1;
}

function responsehandeling(response){
	console.log(response.data)
	if(response.data.connection == 'not found'){
		playbackerror(response.data.connection);
	}
	else if(response.data.response == 'ok')
	{
		console.log(response.data)
	}
	else{
		i = 0
		errors = 0;
		playmusic();
	}
}