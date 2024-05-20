const shortId= require("shortid")
const URL = require("../Models/url")
async function handleNewShortUrl(req,res){
    const body = req.body;
    console.log(body)
    if(!body.url) return res.status(400).json({error:'url is required'})
        const shortID = shortId()
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visiteHistory:[],
    })
    return res.json({id:shortID})
}

module.exports={
    handleNewShortUrl
}