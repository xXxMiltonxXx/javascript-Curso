// Creando Api
//asignacion de framework
//require= importar dependencia
//'express' es el nombre de la dependecia
const express=require('express');

//Creacion de una constante mongoose
//importar la dependencia mongoose
const mongoose=require('mongoose');

//importar modulo personalizado
//ubicacion de modulo
const user= require('./user.controller')
//incializar 

const app= express();

//puerto donde va a funcionar la aplicacion

const port=3000;

//toma todas las peticiones Json las convierte en js y las va a asignar a body
app.use(express.json())

//conexion a la base de datos
//se llama a la constante 
//se llama al método connect
//se pega la url sacada de la web de mongodb 

mongoose.connect('mongodb+srv://miltonXD:Atlas1234@cluster0.venxvyj.mongodb.net/miApp?retryWrites=true&w=majority');


//ruta del navegador 

//localhost:3000/

//servir archivos de una carpeta 
//es una funcion de express
//static es la carpeta lo sive /archivo.js
//app es el nombre de la carptea contenedora
app.use(express.static('app'))

//primer endpoint
//acceso desde el explorador
//para consumir la api se cambian las rutas 

app.get('/usuarios',user.list)

//segundo endpoint
//no se puede acceder desde el explorador web
//se usara postman 

app.post('/usuarios',user.create)

//tercer endpoint
//en la web el :id es un dato variable  /1 o /dfsdff

app.put('/usuarios/:id',user.update)

//cuarto endpoint

app.patch('/usuarios/:id', user.update)

//quinto endpoint
app.delete('/usuarios/:id',user.destroy)

//sexto endpoint 
app.get('/usuarios/:id',user.get)

//endpoint de la raiz
app.get ('/', (req,res)=>{
    console.log(__dirname);
    //método para enviar un archivo html 
    //dirname envia la ubicacion a sendFile
    res.sendFile(`${__dirname}/index.html`)
})

//control de paginas que no existen get
//toma todas las rutas que no se han definido hasta este punto 
app.get('*',user.notfoundget)

//control de paginas que no existen get
//toma todas las rutas que no se han definido hasta este punto 
app.post('*',user.notfoundpost)

//ejecutar la aplicacion
//port= es el puerto que usa la aplicacion
//funcion a ser llevada a cabo cuando se ejecute la aplicacion exitosamente
app.listen(port,()=>{
    console.log('Iniciando ')
})