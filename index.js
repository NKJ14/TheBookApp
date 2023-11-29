const express = require("express");

const app = express();

const port = 3000;

const path = require("path");

app.use(express.urlencoded({extended:true}));   //to understand API request stuff

app.set("view engine","ejs");   //to include ejs stuff (templating)
app.set("views",path.join(__dirname,"views"));      //paths it to views dir


app.use(express.static(path.join(__dirname,"public"))); //paths express static to public dir


let posts = [
    {
        username:"nkj",
        content:"I like web development"
    },
    {
        username:"abc",
        content:"I like pasta"
    },
    {
        username:"bluesclues",
        content:"I'm a giant red dog. Got that dawg in me."
    }
]   //an array that substitutes for database for now (may be connected to a database as well)


app.get("/",(req,res)=>{
    res.send("server works well");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})  //we send the request to posts

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})
