const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const studentSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type: String,
        required:true,
        unique:true
    },
    userName:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength: 4
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:4
    }
})
// studentSchema.pre("save",async function(next){
//     this.password=await bcrypt.hash(this.password,10);
//     // console.log(passHash);
//     next();
// })
// Now we will create a new collection 
const User=new mongoose.model("NewUser",studentSchema);
module.exports=User;