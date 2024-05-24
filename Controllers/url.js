const shortId= require("shortid")
const URL = require("../Models/url")
async function handleNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
        const shortID = shortId()
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visiteHistory:[],
    })
    return res.render("home",{id:shortID})
}

async function GetAnalytics(req,res){
const shortId = req.params.shortId;
const result = await URL.findOne({shortId})
return res.json({
    totalclicks:result.visitHistory.length,
    analytics:result.visitHistory
}) 
}
module.exports={
    handleNewShortUrl,
    GetAnalytics
}