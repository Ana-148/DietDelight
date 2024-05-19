const mongoose= require("mongoose");
const connect = mongoose.connect("mongodb+srv://AnanyaMahant:Ananya29@cluster0.wdxpt6v.mongodb.net/DietDelight?retryWrites=true&w=majority");


connect.then(()=>{
    console.log("Database connected succesfully");
})
.catch(()=>{
    console.log("Database not connected");     
});

//Create schema
const LoginSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String, 
        required:true
    },
    Password:{
        type:String,
        required:true
    }    
},{ collection: 'users', dbName: 'DietDelight' });


const collection = new mongoose.model("users",LoginSchema);
module.exports = collection;