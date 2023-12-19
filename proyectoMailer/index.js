//IMPORTACION DE DEPENDENCIAS
import express from "express"; //convención module
//es útil para realizar operaciones con rutas de archivos y directorios de forma portátil 
//y adecuada para el sistema operativo en el que se ejecuta el código.
import path from "path";//
//importa sendgrid 
import sgMail from '@sendgrid/mail'
//importa dotenv para las variabled e entorno 
import dotenv from 'dotenv'

//se llama a la funcion  
//todos los elementos del archivo .env se agregan a 
//process.env
dotenv.config()

//almacena el resultado del llamado a la funcion express
const app = express()

//setear la variable de entorno 
sgMail.setApiKey(process.env.SGKEY)

//Middleware de Express
//interpreta los JSON que llegan a la APP express
app.use(express.json())
//servir todo lo  que se encuentre en una capeta llamada app
app.use(express.static('app'))

// endpoint que se dirige a la raiz de todo
app.get('/', (req, res) => {
    //res respuesta que envia el servidor web o API al cliente
    //busca la carpeta
    //path.resolve cuando no se envia un argumento 
    //devuelve la ubicacion actual 
    res.sendFile(`${path.resolve()}/index.html`)

    
    
})
//endpoint de envio
//con el verbo post para crear un tarea

app.post ('/send', async (req,res)  =>{
    //se usa destructuracion de objetos
    //permite extraer propiedades especificas de un objeto
    //se saca del cuerpo de la solicitud
    const {para,asunto, html } = req.body

    //envio de mensaje
    const msg = {
        //para quien se va a enviar el mensaje 
        to:para,
        //desde que correo se va a enviar el correo electronico
        from: process.env.FROM,
        //el asunto del mensaje
        subject:asunto,
        //en mensaje en cuention 
        html,

    }

    //control de escepciones
    try{

        //enviar el mensaje con l aimportacion de sendgrid
        await sgMail.send(msg)

        //envia una respuesta con status de 204 que todo esta ok
        res.sendStatus(204)
        
    } //error
    catch (e) {
        //colapsar todos los mensajes en uno 
        //iterar con el map 
        const messages= e.response.body.errors.map(e=>e.message).join(' ')

        res.status(401).send(messages)
    }
})
//funcion de express
//iniciar servidor
//en el primer argumento
app.listen(3000, () => console.log('app corriendo en el puerto 3000 estado ok'))