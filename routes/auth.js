let express = require("express");
let router =  express.Router();
let model = require("../db/user");
let bcrypt = require("bcryptjs");

router.post("/check",async(req,res)=>{
    let user = await model.userModel.findOne({"userLogin.emailId":req.body.userLogin.emailId});
    if(!user){return res.status(404).send({message:"Invalid emailId"})}

   // let password = await model.findOne({"userLogin.password":req.body.userLogin.password})

    let validPassword = await bcrypt.compare(req.body.userLogin.password,user.userLogin.password);

    if(!validPassword){return res.status(404).send({message:"Invalid Password!!"})};
    // let token = jwt.sign({_id:user._id},"shraddhaPassword")
    // let token = jwt.sign({_id:user._id},config.get("ENV_PASSWORD"));
    let token = user.JwtToken();

    res.header("x-auth-token",token).send({message:"Login Done",token})
})

module.exports = router; 