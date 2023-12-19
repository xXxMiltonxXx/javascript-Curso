//funcion del tema inicial
const loadInitialTemplate = () => {
    //constante donde se agregara el html  
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <input  placeholder="Milton" name="nombre" />
        </div>
        <div>
            <label>Apellidos</label>
            <input placeholder="Angamarca" name="apellidos" />
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list"></ul>
    `
    //adjunta el texto html a la etiqueta body 
    //body que se encuentra en index.html

    const body = document.getElementsByTagName('body')[0]
    //asignacion el html dentro de la etiuqueta body
    body.innerHTML = template
}

//tercera funcion 
//mostrar datos 
const getUsuarios= async ()=>{
    //llamado al endpoint usuarios 
    //fetch por defecto realiza usa el método get
    const response=await fetch('/usuarios')
    //se guarda la respuesta 
    //se transforma en json 
    const usuarios=await response.json()
    //plantilla 
    const template = usuario  =>`
    <li>
        ${usuario.nombre} ${usuario.apellidos}<button data-id="${usuario._id}">Eliminar</button>
    </li>
    `
    //map texto html
    const userList=document.getElementById('user-list')
    //reemplazar inner html
    userList.innerHTML=usuarios.map(usuario=>template(usuario)).join('')
    //asignar comportamineto de los nodos 
    //no retorna nada
    usuarios.forEach(usuario => {
        //buscar el boton 
        //(`[]`)se indica el selector 
        const usuarioNodo=document.querySelector(`[data-id="${usuario._id}"]`)
        //se le asigna un evento al boton 
        usuarioNodo.onclick=async e =>{
            //se relaiza la peticion 
            await fetch(`/usuarios/${usuario._id}`,{
                method: 'DELETE',

            })
            //se debe subir un nodo para elminar el elemento 
            usuarioNodo.parentNode.remove()
            //comunicar que fue elminado el usuario 
            alert('Eliminado con éxito')
        }
    });
}

//segunda funcion
const addFormListener = () => {
    //busca el fromular por el id
    //se llama user-form
    const userForm = document.getElementById('user-form')
    //agregar event listener
    userForm.onsubmit = async (e) => {
        //evitar que se refresque 
        e.preventDefault()
        //obtiene todos los datos de un formulario 
        //se envia una referencia al html (userForm)
        const formData = new FormData(userForm)
        //constante 
        //transforma un objeto iterable de entradas
        //transforma en un objeto
        const data = Object.fromEntries(formData.entries())
        //llamado a el endpoint usuarios
        await fetch('/usuarios',{
            //metodo a usar post 
            method:'POST',
            //cuerpo del mensaje
            //convertirlo como string 
            body: JSON.stringify(data),
            //cabecera 
            headers:{

                'content-Type':'application/json'
            }
        })
        //setear los campos del formulario
        userForm.reset()
        //llamado a la funcion 
        getUsuarios();
    }
}

//cuando ha cargado todo el contendio de la ventada 
//cuando se cargue todo el html
window.onload = () => {
    //priemra funcion
    loadInitialTemplate();
    //
    addFormListener();
    //cargar los usuarios 
    getUsuarios();
}
