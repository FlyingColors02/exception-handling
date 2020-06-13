let express = require("express");
let router = express.Router();
let model = require("../db/user");
let bcrypt = require("bcryptjs");
let userMiddleware = require("../middleware/user");
let admin = require("../middleware/admin");
let trycatch = require("../wrapper/trycatchmiddleware");
//removing userMiddleware from this api for testing purpose
//adding trycatch to apply trycatchblock

router.get("/allusers",trycatch(async(req,res)=>{
  let users = await model.userModel.find();
  res.send({data:users});
}));

router.post("/newuser",trycatch(async(req,res)=>{
    let user =await model.userModel.findOne({"userLogin.emailId": req.body.userLogin.emailId});
    if(user){ res.status(403).send({message:"EmailId already Exists!!"})}
    let {error}= model.Validation(req.body);
   if(error){return res.send(error.details[0].message)};
   let newData = new model.userModel({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       Address:req.body.Address,
       userLogin:req.body.userLogin
   }); 
   let salt = await bcrypt.genSalt(10);
     newData.userLogin.password= await bcrypt.hash(newData.userLogin.password,salt);
   let token = user.JwtToken();
     let item= await newData.save();
   res.header("x-auth-token",token).send({message:"welcome",i:item,t:token})
}));

router.delete("/removeuser/:id",[userMiddleware,admin],trycatch(async(req,res)=>{
  let user = await model.userModel.findByIdAndRemove(req.params.id);
  if(!user){return res.status(404).send({message:"Invalid Id!"})};
  res.send({message:"user data got removed"});
}));

module.exports=router;
