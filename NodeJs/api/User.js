//importar mongoose
const mongoose= require('mongoose')

//modelo de base dedatos
//un modelo tiene que tener un nombre 'User'
//objeto js con la forma de los documentos que se guardaran dentro de la coleccion User
const Users=mongoose.model('User',{
    //esquema
    //agaregar las propiedades
    //type:String = es el tipo de elemento que va a recivir
    //require:true = si el atributo es obligatorio su ingreso o no 
    //minLength:3 = tramaño minimo del el string
    nombre:{type:String, require:true, minLength:3},
    apellidos:{type:String, require:true, minLength:3},

})

//exportar el modulo
module.exports=Users;