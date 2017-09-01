var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./friends");

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/survey", function(req, res){
	res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/viewfriends", function(req, res){
	res.json(friends);
});


app.post("/survey", function(req, res) {
	var newFriend = req.body;
	for (i = 0; i < newFriend.scores.length; i++) {
			newFriend.scores[i] = parseInt(newFriend.scores[i]);
		}

	console.log(newFriend);

	

	for (i = 0; i < friends.length; i++){
		for(j = 0; j < friends[i].scores.length; j++){
			var arrayDifference = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
			

			console.log(arrayDifference);
			
		} 
	}

	friends.push(newFriend);

});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});