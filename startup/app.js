let express= require("express");
let user = require("../routes/user");
let auth = require("../routes/auth");
let error = require("../exception/error");

module.exports=function(app){
    app.use("/api/user",user);
    app.use("/api/users",auth);
   app.use(error);
}
