// const sessionIdToUserMap = new Map(); //statefull authentication
const jwt = require("jsonwebtoken")
const secret = "nandini#45"
function setUser(user){
    //sessionIdToUserMap.set(id,user)
    return jwt.sign(  // stateless
        {
            _id:user._id,
            email:user.email
        },
        secret
    )
}

function getUser(token){
   // return sessionIdToUserMap.get(id)
   if(!token) return null;
   try{
    return jwt.verify(token,secret)
   }
   catch(error){
    return null;
   }
}

module.exports ={
    setUser,
    getUser
}