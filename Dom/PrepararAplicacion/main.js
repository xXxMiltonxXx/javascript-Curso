//arreglo vacio
//JSON.parse tranforma en un areglo
//busca los elementos que se encuentran el local storage
//con el nombre de todos
//si no lo encuentra se anade un arreglo vacio 
const todos= JSON.parse(localStorage.getItem('todos'))|| [];
//renderizar actualizar los indices del arreglo recursibidad
const render=()=>{
    const todoList =document.getElementById('todo-list');
    // todoList.innerHTML='';
    // for(let i=0; i < todos.length;i++){
    //     todoList.innerHTML+='<li>'+ todos[i]+'</li>';
    // }
    ///Uso de map simplificacion
                                    //t=>se ejecutas les veces que  hay en ela rreglo
    const todosTemplate= todos.map(t=>'<li>'+t+'</li>');
    //.join('') une todos los elementos con un string vacio
    todoList.innerHTML= todosTemplate.join('');
    //seleccionar elementos que cumplan con la condicion
    const elemetos= document.querySelectorAll('#todo-list li')
    //iteracion
    elemetos.forEach((elemento,i)=>{
        //ecuchador de evento
        elemento.addEventListener('click',()=>{
            //eliminar un elemto 
            //.parentNode (ul)
            //remueve el elemento
            elemento.parentNode.removeChild(elemento);
            //limpiar elemento dentro de todos
            todos.splice(i,1);
            //llamdo a la funcion actualizarTodos
            actualizaTodos(todos);
            render();
        })
    })
}
//actualizar localStorage
const actualizaTodos=(todos)=>{
    //transforma a string
    const todoString=JSON.stringify(todos);
    //llamar a local storage
    localStorage.setItem('todos',todoString);
}
//prevenir error en la aplicacion 
window.onload=()=>{
    render()
    //capurar el evento de enviar 
    const form=document.getElementById('todo-form');
    form.onsubmit = (e) => {
        //evitar de que refresque 
        //evitar el comportamiento por defecto
        e.preventDefault();
        //guradar en un arreglo
        const todo= document.getElementById('todo');
        const todoText = todo.value;
        //limpia el cotenido 
        todo.value='';
        //agregar valores al arreglo
        todos.push(todoText);
        actualizaTodos(todos);
        render();
    }

}
