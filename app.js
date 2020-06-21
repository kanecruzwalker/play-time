const express = require ("express");
const bodyParser = require ("body-parser")
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/playDB", {useNewUrlParser:true, useUnifiedTopology:true});

const userSchema = {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

const User = mongoose.model("User", userSchema)

app.get("/", function(req,res){
    res.render("index");
});

app.post("/", function (req, res){
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    });

    console.log(user.username);
    console.log(user.password);

    user.save(function(err){
        if (err){
            console.log("Error");
        }else{
            res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}


app.listen(port, function(){
    console.log("Server started and connected");
});