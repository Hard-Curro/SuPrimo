// Primero cogemos los datos del formulario
const loginForm = document.querySelector('#loginForm')

// Agregagos el evento submit
loginForm.addEventListener('submit', (e)=>{
    // Llamamos a la funcion preventDefault para que no se nos recarge la pagina
    e.preventDefault()

    // Obtenemos los datos del formulario
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    // Nos traemos la base de datos del localStorage
    const Users = JSON.parse(localStorage.getItem('users')) || []

    // Vamos a hacer un find a la base de datos para buscar el correo y la contraseña
    const validUser = Users.find(user => user.email === email && user.password === password)

    // Validamos si esta registrado ya
    if(!validUser) {
        return alert('Datos incorrectos')
    }
//    alert(`Bienvenido ${validUser.username}`)

    // Anadimos el usuario a sessionStorage
    sessionStorage.setItem('users', JSON.stringify(validUser))
    
    // Redirigimos al index
    window.location.href = 'index.html'
})
