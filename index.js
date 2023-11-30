const express = require("express");

const app = express();

const port = 3000;

const path = require("path");

const { v4 : uuidv4} = require("uuid");

const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));   //to understand API request stuff
app.use(methodOverride("_method"));
app.set("view engine","ejs");   //to include ejs stuff (templating)
app.set("views",path.join(__dirname,"views"));      //paths it to views dir


app.use(express.static(path.join(__dirname,"public"))); //paths express static to public dir


let posts = [
    {
        id:uuidv4(),
        username:"nkj",
        content:"I like web development"
    },
    {
        id:uuidv4(),
        username:"abc",
        content:"I like pasta"
    },
    {
        id:uuidv4(),
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
    let id = uuidv4();
    posts.push({ id,username,content });
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    console.log(post);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs", {post});
})
app.listen(port,()=>{
    console.log(`Listening on ==> localhost:${port}`);
})

