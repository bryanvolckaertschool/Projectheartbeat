# Project hearbeat

Installation

Change .env variables to your servers
Change db.js to your servers
open cmd in the folder of the repo and do npm install



How to use

Music management:

- Add (post to /muziek/add) with arguments: PersonID, Naam, SongID, Duratie
- Delete (post to /muziek/delete) with arguments: PersonID, SongID
- Show songs (post to /muziek/show) with arguments: PersonID
