const express = require('express');
const app = express();

const { Client } = require('pg');
const client = new Client();

client.connect();

const bodyParser = require('body-parser');
//mounts BodyParser as middleware - every request passes through it
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

const port = 80;

app.get('/',function(req, res) {
	res.send('test');
	console.log('testing');
});

app.get('/players/',function(req, res) {
	db.all("SELECT * FROM Players",function(err,rows) {	
		if(err) {
			res.send(err.message);
		}
		console.log("Sending list of players = " + rows.length);
		res.json(rows);	
	});
});

app.get('/players/:id',function(req, res) {
	db.get("SELECT * FROM Players WHERE id = ?",[req.params.id],function(err,row) {		
		if(err) {
			res.send(err.message);
		}
		
		res.json(row);
	});
});

app.listen(port,function() {
	console.log('listening on ' + port);
});