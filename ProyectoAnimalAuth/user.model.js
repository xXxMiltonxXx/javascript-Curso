const mongoose= require('mongoose')

const Usuarios= mongoose.model('Usuario',{
    email:{type:String, required:true, minLength:5},
    password:{type:String,required:true},
    salt:{type:String, required:true},
})

module.exports= Usuarios;