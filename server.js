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
	
	var friendsScores = [];



	for (var i = 0; i < newFriend.scores.length; i++) {
		newFriend.scores[i] = parseInt(newFriend.scores[i]);
		totalNFScore += newFriend.scores[i];

	};

	for (var i = 0; i < friends.length; i++) {
		var sum = 0;
		var currentFriend = friends[i];
		for (var j = 0; j < currentFriend.scores.length; j++) {
			sum += currentFriend.scores[j];

		}
		
		friendsScores[i] = sum - totalNFScore;
		friendsScores = friendsScores.sort(function(a, b){return a - b});
		
	}

	console.log(newFriend);

	console.log(totalNFScore);

	console.log(friendsScores);

	res.json(newFriend);

	friends.push(newFriend);

});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});