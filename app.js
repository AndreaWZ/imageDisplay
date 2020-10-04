const express  = require("express"),
      mongoose = require('mongoose'),
      request  = require("request");

mongoose.connect('mongodb://localhost:27017/images_display', {
useNewUrlParser: true,
useUnifiedTopology: true
});

const app = express();
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
        if(error) {
            console.log(error);
        } else if(response.statusCode == 200){
            const info = JSON.parse(body);
            res.render("main", {info, query});
        } else {
            console.log("Oh, different status code: "  + response.statusCode);
        };
    });
});

app.get("/results", function(req, res){
    const query = req.query.search.toLowerCase().trim();
    const data = {
        url : "https://api.pexels.com/v1/search/?page=1\u0026per_page=50\u0026query=" + query,
        headers: {
            'Authorization': apiKey
        } 
    };
    request(data, function(error,response, body){
        if(error) {
            console.log(error);
            res.redirect("back");
        } else if(response.statusCode == 200) {
            const results = JSON.parse(body);
            if(results.total_results >= 10){
                res.render("results", {results, query});
            } else {
                res.render("notFound");
            }
        } else {
            console.log("Oh, different status code: "  + response.statusCode);
        };
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.listen(3000, function(){
    console.log("Server Running");
});
