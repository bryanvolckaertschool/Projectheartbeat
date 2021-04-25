const Express = require('express');
const bodyParser = require('body-parser');
const configuration = require("./lib/config/config.js");
const cors = require("cors");
const app = Express();

var corsOptions = {
  origin: ['http://localhost:8080'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
// console.log('argv:');
// console.log(process.argv);

configuration.init(process.argv.slice(2));

const assistant = require("./lib/assistant");
const callback = require("./lib/callback");
const device = require("./lib/device");
const config = require("./lib/config");
const deviceId = require("./lib/device/id");
const swagger = require("./lib/swagger");

startApi();

function startApi() {
	console.log('cast-web-api v'+configuration.thisVersion);
	createWebServer();
}

function createWebServer() {
	const webserver = Express();
	webserver.use(bodyParser.json());

	webserver.use(assistant);
	webserver.use(callback);
	webserver.use(device);
	webserver.use(deviceId);
	webserver.use(config);
	webserver.use(swagger);


	webserver.get('/', function (req, res) {
		res.json({castWebApi: `v${configuration.thisVersion}`});
	});

	webserver.listen(configuration.port, () => {
		console.log(`cast-web-api running at http://${configuration.hostname}:${configuration.port}`);
	});

	process.on('message', packet => {
		console.log(configuration.hostname);
		process.send({
			type : 'process:msg',
			data : {
				address : `${configuration.hostname}:${configuration.port}`
			}
		});
	});
}
