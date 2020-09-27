const express = require("express"),
      app = express(),
      request = require("request");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("main");
});

const query = "flower";
const data = {
    url : "https://api.pexels.com/v1/search/?page=2\u0026per_page=2\u0026query=" + query,
    headers: {
      'Authorization': '563492ad6f917000010000013fb745a9edf242cb838bef82e288a017'
    } 
};

request(data, function(error,response, body){
    if(!error && response.statusCode == 200){
        const details = JSON.parse(body);
        // console.log("details: " + details.url);
        // console.log("body: " + body);
     };
   });

// app.post("/results/:id", function(req, res){
//     const query = req.query.search.toLowerCase().trim();
//     const data = {
//         url : "https://api.pexels.com/v1/search?query=cake&per_page=2",
//         headers: {
//           'Authorization': '563492ad6f917000010000013fb745a9edf242cb838bef82e288a017'
//         } 
//     };

//     request(data, function(error,response, body){
//         if(!error && response.statusCode == 200){
//             console.log(body);
//          }
//        });
// });

app.listen(3000, function(){
    console.log("Server Running");
});

