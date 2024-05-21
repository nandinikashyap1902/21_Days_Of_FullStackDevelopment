const express = require('express')
const urlRoute = require('./routes/url')
const URL = require("./Models/url");
const path = require('path')
const {MongoDbConnection} = require('./config')
MongoDbConnection('mongodb://localhost:27017/short-url')
.then(()=>{
  console.log("mongodb connected")
})
const app = express();
app.set('view engine','ejs')
app.set("Views",path.resolve("./Views"))

app.use(express.json())
const PORT = 6000
app.use('/url',urlRoute)
app.get("/:shortId",async(req,res)=>{
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
console.log(entry)
res.redirect(entry.redirectURL)
})

// app.get('/test',async(req,res)=>{
//   console.log('views is runnning')
//   return res.render('home')
// })
app.listen(PORT,()=>console.log('app is running'))