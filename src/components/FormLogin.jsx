import React, { useState } from 'react'
import { Link } from "react-router-dom"

function FormLogin() {

const [correoUsuario,setCorreoUsuario] = useState("")
const [contraseñaUsuario,setContraseñaUsuario] = useState("")

function iniciarSesion(){

if(!correoUsuario || !contraseñaUsuario){

console.log("Debe llenar todos los campos")

return
}

console.log("Correo:",correoUsuario)
console.log("Contraseña:",contraseñaUsuario)

}

return (

<div>

<h2>Ingrese su correo</h2>

<input
type="text"
value={correoUsuario}
onChange={(e)=>setCorreoUsuario(e.target.value)}
/>

<h2>Ingrese su contraseña</h2>

<input
type="password"
value={contraseñaUsuario}
onChange={(e)=>setContraseñaUsuario(e.target.value)}
/>

<br /><br />

<button onClick={iniciarSesion}>
Iniciar sesión
</button>

<div>
<br />

<Link to="/registro">Registrarse</Link>

</div>

</div>

)

}

export default FormLogin