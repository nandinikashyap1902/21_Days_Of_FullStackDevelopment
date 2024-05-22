const express = require('express')
const app = express();
const urlRoute = require('./routes/url')
const URL = require("./Models/url");
const path = require('path')
const staticRoute = require("./routes/staticRouter")
const {MongoDbConnection} = require('./config')
MongoDbConnection('mongodb://localhost:27017/short-url')
.then(()=>{
  console.log("mongodb connected")
})
app.set('view engine','ejs')
app.set("views",path.resolve("./Views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const PORT = 6001
app.use('/url',urlRoute)
app.use("/",staticRoute)
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