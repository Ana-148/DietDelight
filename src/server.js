const express=require("express");
//const fs=require("fs");
const path = require("path");
const bcrypt= require("bcrypt");
const collection=require("./config")

const app=express();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})
//Register USer
app.post("/signup",async(req,res)=>{
    const data ={
        Name: req.body.name,
        Email: req.body.email,
        Password:req.body.password
    }

    //check if user already exist
    const existinguser = await collection.findOne({Email:data.Email});
    if(existinguser)
    {
        res.send("User already exist. Please choose a different email.");
    }
    else{
        //hash the password using bcrypt
        const saltRounds = 10; //number of salt rounds for bcrypt
        //const password = 'ysecretpassword';
        const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
        data.Password = hashedPassword; //replace the hashpassword with og password
    const userdata = await collection.insertMany(data);
    console.log(userdata);
res.render("login");}
})


//Login User

app.post("/login",async(req,res)=>{
    //res.set('Content-Type', 'text/html');
    try{
        const check = await collection.findOne({Email: req.body.email});
        if(!check){
            res.send("User cannot be found");
        }
        //comapre hashpassword in db
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.Password);
        if(isPasswordMatch){
            
            res.render("index");
        }
        else{
            res.send("Invalid Password");
        }
    }catch{
        res.send("wrong details");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
});


app.listen(3000,(err)=>{

    if(err)
    console.log("Unable to start server...");
else
console.log("Server Started...")
})



