var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./friends");

var app = express();
var PORT = process.env.PORT || 3000;

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

	var totalNFScore = 0;
	
	var friendsSorting = [];



	for (var i = 0; i < newFriend.scores.length; i++) {
		newFriend.scores[i] = parseInt(newFriend.scores[i]);
		totalNFScore += newFriend.scores[i];

	};

	newFriend.score = totalNFScore;

	for (var i = 0; i < friends.length; i++) {
		var currentFriend = friends[i];
		
		var calculatedScore = Math.abs(currentFriend.score - newFriend.score);
		
		var friendsObject = {score: calculatedScore, name: currentFriend.name};
		
		friendsSorting.push(friendsObject);
		
	};
	friendsSorting = friendsSorting.sort(function(a, b){return a.score - b.score});

	console.log("Your best friend is " + friendsSorting[0].name);


	res.json(newFriend);

	friends.push(newFriend);

	
});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});