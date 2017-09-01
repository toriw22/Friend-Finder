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

	var friendOrder = 0;

	for (i = 0; i < newFriend.scores.length; i++) {
		newFriend.scores[i] = parseInt(newFriend.scores[i]);
		totalNFScore += newFriend.scores[i];

		function calculateFriendScores (friendOrder) { 
			while(friendOrder < friends.length) { 
				friendsScores[friendOrder] += parseInt(friends[friendOrder].scores[i]);
				friendOrder++;
				calculateFriendScores();
			}
		};

		calculateFriendScores(friendOrder);
	};
	
	console.log(newFriend);

	console.log(totalNFScore);

	console.log(friendsScores);

	res.json(newFriend);

	friends.push(newFriend);

});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});