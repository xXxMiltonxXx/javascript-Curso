// importar dependecia de db
const mongoose= require('mongoose')

//modelo 
const Usuario=mongoose.model('Usuario',{
    //esquema
    //son los atributos que tendra un usuarios
    email:{type:String, required:true},
    password:{type:String, required:true},
    salt:{type:String, required:true},
})

//exportar el modelo 
module.exports=Usuario;