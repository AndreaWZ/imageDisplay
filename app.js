const express = require("express"),
      app = express(),
      request = require("request");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    const query = "spring";
    const data = {
        url : "https://api.pexels.com/v1/search/?page=2\u0026per_page=30\u0026query=" + query,
        headers: {
        'Authorization': '563492ad6f917000010000013fb745a9edf242cb838bef82e288a017'
        } 
    };
    request(data, function(error,response, body){
        if(!error && response.statusCode == 200){
            const info = JSON.parse(body);
            // console.log("info: " + info);
            // console.log("body: " + body);
            res.render("main", {info});
        };
    });
});

app.listen(3000, function(){
    console.log("Server Running");
});
