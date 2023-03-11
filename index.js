const express =require("express");
const connectTOMongo = require("./db");
const cors =require('cors');
const app=express();
const path=require("path");
const port= process.env.port || 5000;
connectTOMongo();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.use(express.static(path.join(__dirname,"./inote/build")));
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./inote/build/index.html"),
        function(err){
            res.status(500).send(err);
        }
    );
});

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static("inote/build"));
//     const path=require("path");
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'inote','build','index.html'));
//     })
// }

app.listen(port,()=>{
    console.log(`connected to the  Vnotes server at localhost:${port}`);
})