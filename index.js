const express = require('express')
const urlRoute = require('./routes/url')
const URL = require("./Models/url");

const {MongoDbConnection} = require('./config')
MongoDbConnection('mongodb://localhost:27017/short-url')
.then(()=>{
  console.log("mongodb connected")
})
const app = express();
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
app.listen(PORT,()=>console.log('app is running'))