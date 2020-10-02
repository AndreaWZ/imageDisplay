const express = require("express"),
      app = express(),
      request = require("request");

const apiKey = "563492ad6f917000010000013fb745a9edf242cb838bef82e288a017";

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    const query = "fall";
    const data = {
        url : "https://api.pexels.com/v1/search/?page=1\u0026per_page=50\u0026query=" + query,
        headers: {
        'Authorization': apiKey
        } 
    };
    request(data, function(error,response, body){
        if(!error && response.statusCode == 200){
            const info = JSON.parse(body);
            res.render("main", {info});
        };
    });
});

app.get("/results", function(req, res){
    const query = req.query.search;
    const data = {
        url : "https://api.pexels.com/v1/search/?page=1\u0026per_page=50\u0026query=" + query,
        headers: {
        'Authorization': apiKey
        } 
    };
    request(data, function(error,response, body){
        if(!error && response.statusCode == 200){
            const results = JSON.parse(body);
            if(results.total_results !== 0){
                res.render("results", {results, query});
            } else {
                res.render("notFound");
            }
        };
    });
});

app.listen(3000, function(){
    console.log("Server Running");
});
