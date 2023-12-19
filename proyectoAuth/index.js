//importar dependecias
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const Usuario = require('./user');

//conexion a la base de datos
mongoose.connect('mongodb+srv://miltonXD:Atlas1234@cluster0.venxvyj.mongodb.net/autenticacion?retryWrites=true&w=majority')

//aplicacion 
const app = express();
//recivir datos en formato json 
app.use(express.json())

//Middleware de validacion 
//función de validacion JsonWebToken 
//se usa la dependecia expressJWt
//se envia un objeto con el string secreto 
//algoritmo que encripta
const validacionJwt = expressJwt({ secret: process.env.secret, algorithms: ['HS256'] })

//funcion de firma de jsonWebtoken 
//recive un _id
//encripta el parametro con el valor siguiente 
const firmaToken = _id => jwt.sign({ _id }, process.env.secret)

//primer endpoint 
//regristro si exite no lo crea 
app.post('/registro', async (req, res) => {
    //se saca el body de la req (correo contraseña)
    const { body } = req
    console.log({ body })
    //control de errores
    //trata de hacer
    try {
        //realizar la busqueda
        //primero buscará en si existe algun usuario con el correo
        //el cual se encuentra en body
        const esUsuario = await Usuario.findOne({ email: body.email })
        //si existe el usuario
        if (esUsuario) {

            //mensaje
            return res.status(403).send('el usuario ya existe')
        } else {
            //no es necesario agregar else
            //si no existe el usuario se creará un salta 
            //usando la dependecia bcrypt 
            //con el método genSalt()
            const salt = await bcrypt.genSalt()
            //contrasena encriptada
            //usando la dependecia bcrypt 
            //con el metodo hash 
            //se envia la contraseña 
            //y luego se envia el salt
            const hashed = await bcrypt.hash(body.password, salt)
            //crear el usuario 
            //se envia el email 
            //la contraseña encriptada
            //y el salt
            const usuario = await Usuario.create({ email: body.email, password: hashed, salt })
            //encriptar el id 
            //se guarda en una constante el jsonWebToken firmado
            //se llama a la funcion 
            //se envia el parametro   
            const firmado = firmaToken(usuario._id)
            //muestra el id de usuario
            //envia un jsonWeb token 
            res.status(201).send(firmado)
        }

    } catch (err) {//si ocurre un error
        console.log(err)
        //mensaje para el cliente 
        res.status(500).send(err.message)
    }
})

//inicio de sesion
//segundo endpoint 
app.post('/acceso', async (req, res) => {
    //sacar el cuertpo de la peticion 
    //se eviara el usuario y la contraseña en post 
    const { body } = req
    //control de excepciones 
    try {
        //guardar usuario 
        //se buscar por le valor de email 
        // este se encontrar en body
        const usuario = await Usuario.findOne({ email: body.email })
        //si no existe usuario 
        if (!usuario) {
            //mensaje de error
            res.status(403).send('usuario o contraseña invalidas')
        } else {
            //compara la contraseña que existe en el usuario 
            //con la que existe en el post
            //se usa bcrypt
            //compara la contraseña sin enciptar con la encriptada
            const seEmpareja = await bcrypt.compare(body.password, usuario.password)
            //condicion 
            if (seEmpareja) {//si es que coinciden 
                //se firma el jsonwebtoken 
                //se envia el id
                const firmado = firmaToken(usuario._id)
                //se envia un estatus y el jwt firmado 
                res.status(200).send(firmado)
            } else {
                //si no 
                //envia un estatus 403
                //y un mensaje de error
                res.status(403).send('Usuario y/o contraseña no encontrados ')
            }
        }

    } catch (err) {
        //capturar el error
        res.status(500).send(err.message)
    }
})

//funcion de buscar y asignar usuario 
const buscarAsignarUsuario = async (req, res, next) => {
    //
    try {
        //va a buscar en la base de datos al usuario 
        const usuario = await Usuario.findById(req.auth._id)
        if (!usuario) {//si no existe 
            return res.status(401).end()
        }
        //si lo encuentra 
        //asigna a la propieda usuario 
        req.usuario = usuario
        next()
    } catch (e) {
        //si existe un error 
        next(e)
    }
}

//unir middlewares
//se usa dependecia espress, el método Router y el metodo use 
// se ingresan los middlewares que se desean unir 
const estaAutenticado=express.Router().use(validacionJwt,buscarAsignarUsuario)

//endpoint ruta protegida
//se ingresa la ruta 'lele'
//se envia el middleware unido 
//al final la lógica del endpoint 
app.get('/lele', estaAutenticado, (req, res) => {
    //


    //manejo del endpoint 
    //devuleve el usuario completo (todos los atributos )
    res.send(req.usuario)
})


//puerto que escucha 
app.listen(3000, () => {
    console.log('Escuchando por el puerto 3000');
})