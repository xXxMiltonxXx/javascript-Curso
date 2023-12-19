//controlador de la autenticacion 
//dependecias
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {expressjwt}  = require('express-jwt')
const Usuario = require('./user.model')
//validacion middleware
const validacionJwt = expressjwt({ secret: process.env.secret, algorithms: ['HS256'] })

//funcion de firmar token 
const firmaToken = _id => jwt.sign({ _id }, process.env.secret)

//funcion de buscar y asignar usuario 
const buscarAsignarUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.auth._id)
        if (!usuario) {
            return res.status(401).end()
        }
        req.auth = usuario
        next()
    } catch (e) {
        next(e)
    }
}
//
//union de los middlewares
const estaAutenticado = express.Router().use(validacionJwt, buscarAsignarUsuario)

//controlador 
const Aut = {
    //inicar sesion
    login: async (req, res) => {
        const { body } = req
        try {
            const usuario = await Usuario.findOne({ email: body.email })
            if (!usuario) {
                res.status(401).send('Usuario y/o contraseña invalida')

            } else {
                const seEmpareja = await bcrypt.compare(body.password, usuario.password)
                if (seEmpareja) {
                    const firmado = firmaToken(usuario._id)
                    res.status(200).send(firmado)
                } else {
                    res.status(401).send('Usuario y/o contraseña invalida')
                }
            }
        } catch (e) {
            res.send(e.message)
        }
    },
    //registro
    resgister: async (req, res) => {
        const { body } = req
        try {
            const esUsuario = await Usuario.findOne({ email: body.email })
            if (esUsuario) {
                res.send('Usuario ya existente')
            } else {
                const salt = await bcrypt.genSalt()
                const hashed = await bcrypt.hash(body.password, salt)
                const usuario = await Usuario.create({ email: body.email, password: hashed, salt })
                const firmado = firmaToken(usuario._id)
                res.send(firmado)
            }

        }catch(e){
            res.status(500).send(e.message)
        }

    },
}

module.exports = { Aut, estaAutenticado }