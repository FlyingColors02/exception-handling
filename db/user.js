let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let config = require("config");
let jwt = require("jsonwebtoken");

let UserSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    Address:{type:String,required:true},
    userLogin:{
        emailId:{type:String,required:true},
       password:{type:String,required:true}
    },
    isAdmin:{type:Boolean}
});

UserSchema.methods.JwtToken = function(){
    let token = jwt.sign({_id: this._id, firstname:this.firstname, isAdmin:this.isAdmin},
        config.get("ENV_PASSWORD"));
        return token;
}

function Validation(data){
    let Schema = Joi.object({
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        Address:Joi.string().required(),
        userLogin:{
            emailId:Joi.string().required(),
            password:Joi.string().required()
        }
    })
    return Schema.validate(data);
}

let userModel = mongoose.model("userDetails",UserSchema);
module.exports ={userModel,Validation};