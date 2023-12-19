//dependecias
const express = require('express');
const mongoose = require('mongoose');
const Animal = require('./animal.controller');
const { Aut,estaAutenticado } = require('./auth.controller');
const port = 3000;
//base de datos 
//local
//'mongodb://localhost:27017/miapp'
//atlas
mongoose.connect('mongodb+srv://miltonXD:Atlas1234@cluster0.venxvyj.mongodb.net/animalApp?retryWrites=true&w=majority')
//inicializacion de la aplicacion
const app = express();
//
app.use(express.json())
//endpoints
//de animales
app.get('/animals', estaAutenticado,Animal.list)
app.post('/animals', estaAutenticado,Animal.create)
app.put('/animals/:id', estaAutenticado,Animal.update)
app.patch('/animals/:id', estaAutenticado,Animal.update)
app.delete('/animals/:id', estaAutenticado,Animal.destroy)
//endpoints
//de usuario 
app.post('/login', Aut.login)
app.post('/registro', Aut.resgister)
//servir archivos dentro de la carpeta app
app.use(express.static('app'))
//archivo html
app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
//error custom
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})
//luerto por el que escucha 
app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
