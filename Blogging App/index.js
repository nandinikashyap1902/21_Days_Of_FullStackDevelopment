const express = require("express")
const path = require("path")
const userRoute = require('./routes/user')
const mongoose = require("mongoose")
const app = express()

const PORT = 7000
mongoose.connect("mongodb://localhost:27017/blogdekho")
.then((e)=>console.log("mongodb Connected"))

app.set("view engine","ejs")

app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("home")
})
app.use("/user",userRoute)
app.listen(PORT,()=>{
    console.log("app is running")
})