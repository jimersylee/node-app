
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const user=new Schema({
    name:{
        type:"String"
    },
    password:{
        type:"String"
    },
    gmt_created:Date,
    gmt_updated:Date
});

module.exports=mongoose.model("user",user);
