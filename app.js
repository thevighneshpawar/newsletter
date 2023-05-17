// const express = require('express');
// const bodyParser = require('body-parser');
// const request= require('request');

// const app= express();

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/",function(req,res){
//    res.sendFile(__dirname+"/signup.html");
//  })

//  app.post("/",function(req,res) {
   
//   const firstName= req.body.first;
//   const lastName= req.body.last;
//   const email = req.body.email;

//   const data ={
   
//   }
//  })


// app.listen(3000,function(){
//     console.log("Server is Running On port 3000");
//  })


//  193f46ecb1f69a7fa038c54e31f66924-us12

// 89e0e2e034


const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const request = require("request");
 
mailchimp.setConfig({
    apiKey: "193f46ecb1f69a7fa038c54e31f66924-us12",
    server: "us12"
})
 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
 
app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
})
 
app.post("/", function(req,res){
    let firstName = req.body.first;
    let lastName = req.body.last;
    let email = req.body.email;
 
    const listId = "89e0e2e034";
    const subscribeData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const subscribe = async () => {
        const response = await mailchimp.lists.batchListMembers(listId, subscribeData);
        console.log(response);
            if(response.error_count == 0){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
    };
    subscribe();
})
 
app.post("/failure", function(req,res){
    res.redirect("/");
})
 
app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server is up and Running!!");
})
