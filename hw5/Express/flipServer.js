var express = require("express"),
http = require("http"),
bodyParser = require("body-parser"),
app = express(),

//Result Object
results = {};
results.wins = 0;
results.losses = 0;

app.use(express.static(__dirname + "/client"));

// tell Express to parse incoming
//JSON objects
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

http.createServer(app).listen(3000);
                
//Send the results to the client

app.get("/stats", function (req, res) {
        res.send("Wins: "+ results.wins + " | Losses: " + results.losses);
});
            
                        
//Flip the Coin 
app.post("/flip", function (req, res) {
    //  the coin object is now stored in req.body
    var coinCallObj = req.body;
    var coinCallRes = coinCallObj.call;
    
    console.log("My flip: " + coinCallRes);
    
    //randomly generate heads or tails
    var coinResults = ['heads', 'tails'];
    var coinResult = 
    coinResults[Math.floor(Math.random()*coinResults.length)];
    console.log('Compter Choice: ' + coinResult);
    
    //get the result
    var result;
    if(coinResult === coinCallRes){
        result = "Win";
        results.wins = results.wins +1;
    }
    else{
        result = "Lose";
        results.losses = results.losses + 1;
    }
    
    console.log(result);
    // send back the result
    res.json({"result": result});
});
