const loadInitialTemplate = () => {
	const template = `
		<h1>Animales</h1>
		<form id="animal-form">
			<div>
				<label>Nombre</label>
				<input name="name" />
			</div>
			<div>
				<label>Tipo</label>
				<input name="type" />
			</div>
			<button type="submit">Enviar</button>
		</form>
		<ul id="animal-list"></ul>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const getAnimals = async () => {
	const response = await fetch('/animals', {
		headers: {
			Authorization:localStorage.getItem('jwt')
		}
	})
	const animals = await response.json()
	const template = animal => `
		<li>
			${animal.name} ${animal.type} <button data-id="${animal._id}">Eliminar</button>
		</li>
	`

	const animalList = document.getElementById('animal-list')
	animalList.innerHTML = animals.map(animal => template(animal)).join('')
	animals.forEach(animal => {
		animalNode = document.querySelector(`[data-id="${animal._id}"]`)
		animalNode.onclick = async e => {
			await fetch(`/animals/${animal._id}`, {
				method: 'DELETE',
			})
			animalNode.parentNode.remove()
			alert('Eliminado con éxito')
		}
	})
}

const addFormListener = () => {
	const animalForm = document.getElementById('animal-form')
	animalForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(animalForm)
		const data = Object.fromEntries(formData.entries())
		await fetch('/animals', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		animalForm.reset()
		getAnimals()
	}
}
//funcion que busca un json web token 
const revisaAcceso = () =>{
	return 	localStorage.getItem('jwt')
}

//funcion que carga la pagina de animal
const paginaAnimal = () => {
	loadInitialTemplate()
	addFormListener()
	getAnimals()
}

const loadRegisterTemplate = () => {
	const template = `
	<h1>Registro</h1>
	<form id="register-form">
		<div>
			<label>Correo</label>
			<input name="email" />
		</div>
		<div>
			<label>Contraseña</label>
			<input name="password" />
		</div>
		<button type="submit">Crear</button>
	</form>
	<a href="#" id="login">Iniciar sesión</a>
	<div id="error"></div>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}
const addRegisterListener = () => {
	const registerForm= document.getElementById('register-form')
	registerForm.onsubmit=async(e)=>{
		e.preventDefault()
		const formData= new FormData(registerForm)
		const data = Object.fromEntries(formData.entries())
		const response=await fetch('/registro',{
			method:'POST',
			body:JSON.stringify(data),
			headers: {
				'Content-type':'application/json'
			}
		})
		const responseData= await response.text()
		if(response.status >=300){
			const errorNode= document.getElementById('error')
			errorNode.innerHTML=responseData
		}else{
			localStorage.setItem('jwt', `Bearer ${responseData}`)
			paginaAnimal()
		}
		registerForm.reset();
	}
}
const gotoLoginListener = () => {

}
const paginaRegistro = () => {
	loadRegisterTemplate()//carga la plantilla
	addRegisterListener()//funcionalidad a los elementos
	gotoLoginListener()// redireccion
}
const paginaLogin = () => {
	LoadLoginTemplate()
	addLoginListener()
	gotoRegisterListener()
}
//funcion template del formulario login 
const LoadLoginTemplate = () => {
	const template = `
	<h1>Login</h1>
	<form id="login-form">
		<div>
			<label>Correo</label>
			<input name="email" />
		</div>
		<div>
			<label>Contraseña</label>
			<input name="password" />
		</div>
		<button type="submit">Enviar</button>
	</form>
	<a href="#" id="register">Registrarse</a>
	<div id="error"></div>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

//link al registro
const gotoRegisterListener = () => {
	const gotoRegister = document.getElementById('register')
	gotoRegister.onclick = (e) => {
		e.preventDefault()
		paginaRegistro()
	}
}

//funcion para ingresar datos en el login 
const addLoginListener = () => {
	const loginForm = document.getElementById('login-form')
	loginForm.onsubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(loginForm)
		const data = Object.fromEntries(formData.entries())
		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json'
			}
		})
		const responseData = await response.text()
		if (response.status >= 300) {
			const errorNode = document.getElementById('error')
			errorNode.innerHTML = responseData
		} else {
			console.log(responseData)
		}
		loginForm.reset();
	}
}

window.onload = () => {
	const estaRegistrado = revisaAcceso()
	if (estaRegistrado) {
		paginaAnimal()
	} else {
		//fromulario de inicio de sesion 
		paginaLogin()
	}
}
