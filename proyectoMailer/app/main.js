
//se ejecuta despues de que se haya cargado todo dentro de la página
window.onload =() =>{
    //constante que guarda los datos del formulario 
    //busca el formulario por el id
    const mailForm = document.getElementById('correo-form');
    //cuando exista el evento enviar (submit)
    //peticion asincrona 
    mailForm.onsubmit = async (e) =>{
        //previene que se refresque
        e.preventDefault()
        //referencia del nodo de error 
        const error = document.getElementById('error')
        //los errores estan vacios 
        error.innerHTML = ''
        //transoformar los datos que se encuentran en un formulario en un objeto JS
        const formData =  new FormData(mailForm)
        //entries() convierte el objeto FormDate en pares clave-valor
        //Object.fromEntries convierte un objeto de tipo FormData en un objeto JS regular 
        const data = Object.fromEntries(formData.entries())
        //solicitud que se envia a la URl /send
        //funcion fetch asincrona 
        const response = await fetch ('/send',{
            //metodo que usara la solicitud
            method:'POST',
            //tipo de datos que contendra el cuerpo
            //convierte el objeto tipo JS regular en JSON
            body: JSON.stringify(data),
            //Establece las cabeceras
            headers:{
                //especifica que el contenido del cuerpo esta en fromato JSON
                'Content-Type':'application/json',
            }
        })
        //se obtiene la respuesta del servidor
        //en forma de texto
        const responseText = await response.text()
        //condicion segun el codigo de estado del servidor si es mayor a 300
        if (response.status > 300){
            //si ocurre un error se rremplaza el html
            //por en mensaj de error del servidor 
            error.innerHTML = responseText
            //timer para que deje de asomar el mensaje de error
            const timer = setTimeout(()=>{
                error.innerHTML='';
            },3000)
            //retorna detiene ejecucion
            return
        }

        //reinicia el formulario
        mailForm.reset()
        //mensaje de envio si todo fue correcto
        alert('correo enviado con exito')

    }
}
