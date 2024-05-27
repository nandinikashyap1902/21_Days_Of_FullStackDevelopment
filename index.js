const express = require('express')
const app = express();

const urlRoute = require('./routes/url')
const staticRoute = require("./routes/staticRouter")
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser');
const URL = require("./Models/url");
const path = require('path')
const {MongoDbConnection} = require('./config')
const{restrictToLoggedinUserOnly} = require('./middlewares/auth')
MongoDbConnection('mongodb://localhost:27017/short-url')
.then(()=>{
  console.log("mongodb connected")
})
app.set('view engine','ejs')
app.set("views",path.resolve("./Views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const PORT = 6001
app.use('/url',restrictToLoggedinUserOnly,urlRoute)
app.use("/",staticRoute)
app.use("/user",userRoute)
app.use(cookieParser())
app.get("/url/:shortId",async(req,res)=>{
  const shortId = req.params.shortId;
 const entry= await URL.findOneAndUpdate({
    shortId,
  },{
    $push:{
      visitHistory:{
        timestamp:Date.now()
      }
    }
  }
)
//console.log(entry)
res.redirect(entry.redirectURL)
})

app.get("/test",async(req,res)=>{
  const urls =await URL.find({})
  //console.log(urls)
  //console.log('views is runnning')
  return res.render('home',{
    urls:urls
  })
})
app.listen(PORT,()=>console.log('app is running'))