const express = require("express");
const app = express();
const request = require("request");
const data = {
    url : "https://api.pexels.com/v1/search?query=cake&per_page=2",
    headers: {
      'Authorization': '563492ad6f917000010000013fb745a9edf242cb838bef82e288a017'
    } 
};

app.set("view engine","ejs");

app.get("/", function(req, res){
    res.render("main");
});

request(data, function(error,response, body){
 if(!error && response.statusCode == 200){
      console.log(body);
  }
});

app.listen(3000, function(){
    console.log("Server Running");
});

