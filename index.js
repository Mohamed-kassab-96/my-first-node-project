// const { name } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const article = require("./models/article")
app.use(express.json());

mongoose
   .connect(
    "mongodb+srv://moha:moha123@cluster0.yace9ql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   )
   .then(()=>{
       console.log("connected successfully");
   }).catch((error)=> {
       console.log("error with connecting to the db",error);
   })

app.get("/", (req, res) => {
    res.send(" ya wolcome ya welcome ya wolcome")
});

app.get("/sayHello", (req,res) => {
    // console.log(req.body);
    // res.send(`hello ${req.body.name}, and Age = ${req.query.age}`);
    res.json({
        name: req.body.name,
        age: req.query.age,
        lang: "Arabic"
    })
})

app.get("/numbers", (req, res) => {
    let numbers = "";
    for (i = 0; i <= 100; i++) {
        numbers += i + "-";
    };
    // res.send(`The numbers are : ${numbers}`);
    // res.send("<h1>hello world</h1>");

    // res.send(__dirname + "/views/numbers.html");
    // res.sendFile(__dirname + "/views/numbers.html");
    res.render("numbers.ejs", {
        name: "mohamed",
        age: 50,
        nums: numbers
    })
});

app.get("/findSum/:num1/:num2", (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let total = Number(num1) + Number (num2);
    // console.log(req.params);
    // res.send("find sum");
    res.send(`the sum =  ${total} `);
});

app.get("/home", (req, res) => {
    res.send("wolcome home")
});

app.post("/home", (req, res) => {
    res.send("client is commenting in home page")
});

app.get("/about", (req, res) => {
    res.send("wolcome about page")
});

app.get("/contact", (req, res) => {
    res.send("wolcome contact page")
});

app.post("/comment", (req, res) => {
    res.send("client is commenting in comment page ")
});

app.delete("/deletePost", (req, res) => {
    res.send("post deleted")
});

// ======= Article END-POINTS ========
app.post("/article", async (req, res) => { 
    const newArticle = new article()
    const articleTitle = req.body.artTitle
    const articleBody= req.body.artBody


    newArticle.title = articleTitle
    newArticle.body = articleBody 
    newArticle.numOfLikes = 100
    await newArticle.save();
    res.json(newArticle);
});

app.get("/article", async(req, res) =>{
    const Articles = await article.find();
    console.log("the articles are", Articles);
    res.json(Articles)
});

app.get("/article/:articleId", async(req, res) => {
    const id = req.params.articleId;
    try{
        const arti = await article.findById(id);
        res.json(arti);
        return;
    }catch(error){
        console.log("error while reading article of id",id);
        return res.send("error");
    }
});

app.delete("/article/:articleId",async (req, res) => {
    const id = req.params.articleId;
    try{
        const arti = await article.findByIdAndDelete(id);
        res.json(arti);
        return;
    }catch(error){
        console.log("error while reading article of id",id);
        return res.send("error");
    }
});

app.get("/showArticles", async(req, res) =>{
    const artic = await article.find(); 
    res.render("articles.ejs", {
        allArticles: artic,
    })
})

app.listen(4915, () =>{
    console.log("server is running in port 4915");
});
