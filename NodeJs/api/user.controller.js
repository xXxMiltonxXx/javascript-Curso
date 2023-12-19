//importamos la dependecia User
//la misma que contien el modelo de la base de datos 
const Users = require('./User')

//gestion de usuarios
const User = {
    //listar usuarios 
    //get
    list: async (req, res) => {
        //constante guarda los usuarios 
        //await 
        //User coleccion 
        //find() buscará todo lo que se encuentre dentod de la colección User
        const users = await Users.find()
        console.log(users)
        res.status(200).send(users)
    },
    //create
    //post
    create: async (req, res) => {
        //datos de las peticiones post viende desde body
        //constante user instancia de modelo User
        //new nueva instancia del modelo User
        //datos que se encuentran en req.params
        const user = new Users(req.body)
        //guardar en la base de datos
        //await por que devuelve una promesa user.save()
        //se guarda en una cosntante para imprimir en la consola (no es necesario)
        const saveUser = await user.save()
        res.status(201).send(saveUser._id)
    },
    //actualizar
    //put y patch
    update: async (req, res) => {
        //id es traido desde params
        const {id}=req.params;
        //trae el valor esperado en este caso por id
        const user= await Users.findOne({_id:id});
        //reemplazar los datos 
        //a quein se va a reemplar user
        //la peticion que viene desde el cliente
        Object.assign(user,req.body);
        //guarda
        await user.save();
        //estatus
        res.sendStatus(204)
    },
    //eliminar 
    //delete
    destroy: async (req, res) => {
        //id es traido desde params 
        const {id}=req.params;
        //buscamos el dato por el id 
        const user = await Users.findOne({_id:id});
        //condicion si exite el valor esperado
        if(user){
            // si existe lo remueve
            await user.remove();
        }
        //envia un estado de ok 
        res.sendStatus(204)
    },
    //obtener uno
    get: async (req, res) => {
        //id es obtenido desde params 
        const{id}=req.params
        //se lo busca en la abse de datos 
        // se requiee traer uno findOne 
        //({})el atributo que se desa usar como filtro _id:id (es el valor traido de params)
        const user =await Users.findOne({_id:id})
        //se envia el usuario que se encontro
        res.status(200).send(user)
    },
    //rutas no encontradasget
    notfoundget: (req, res) => {
        res.status(404).send('Pagina no existe')
    },
    notfoundpost: (req, res) => {
        res.status(404).send('Página no encontrada')
    }

}

//exportar modulo personalizado
// User = lo que se va responder 
module.exports = User;