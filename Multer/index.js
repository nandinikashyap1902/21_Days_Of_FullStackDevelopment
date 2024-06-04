const express = require("express")
const path = require("path")
const app= express();
const PORT = 7000
const multer = require("multer")
//const upload = multer({dest:"uploads/"})
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.get('/',(req,res)=>{
    return res.render("homepage")
    //console.log('/ is active')
})

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})
app.post("/upload",upload.single("profileImg"),(req,res)=>{
// console.log(req.body)
// console.log(req.file)
return res.redirect("/")
})
app.listen(PORT,()=>{
    console.log(`app is running at${PORT}`)
})