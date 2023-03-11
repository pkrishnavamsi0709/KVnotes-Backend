const mongoose =require("mongoose");
const mongoUrl="mongodb+srv://pkrishnavamsi0709:Vamsi%400709@cluster0.evtqw4h.mongodb.net/?retryWrites=true&w=majority"


const connectToMongo =()=>{
    mongoose.connect(mongoUrl,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("sucessfully connected to database");
    }).catch((e)=>{console.log(e);
    })
}

module.exports =connectToMongo;