### Project hearbeats

## Installation

Run npm i in the following folders:
    - Nodejs
    - cast-web-api
    - youtube-audio-server
    - Nodejs


Change .env variables to your servers
Change db.js to your servers
open cmd in the folder of the repo and do npm install



## How to use

# Music management:

- Add (POST to /muziek/add) with arguments: PersonID, Naam, SongID, Duratie
- Delete (DELETE to /muziek/delete) with arguments: PersonID, SongID
- Show songs (POST to /muziek/show) with arguments: PersonID

# User management:

- Add (POST to /users/add) with arguments: Naam, SpeakerID, baseHartslag, baseSPO2, typeDementie
- Show (POST to /users/show) with arguments: PersonID
- Delete (DELETE to /users/delete) with arguments: PersonID

# Admin management:

- Register (POST to /auth/register) with arguments: Naam, Email, Wachtwoord
- Login (POST to /auth/login) with arguments: Email, Wachtwoord
- show (POST to /auth/show)
- Delete (DELETE to /auth/delete) with arguments: ID

# Playback:

- Start (POST to /playback/start) with arguments: PersonID
- Stop (POST to /playback/stop) with arguments: PersonID
