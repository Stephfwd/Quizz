import React, { useState, useEffect } from 'react'
import ServicioUsuarios from '../services/ServicioUsuarios'
import { Link } from "react-router-dom"

function FormRegistro() {

const [usuarios,setUsuarios] = useState([])

const [nombreUsuario,setNombreUsuario]= useState("")
const [correoUsuario,setCorreoUsuario]= useState("")
const [contraseñaUsuario,setContraseñaUsuario]= useState("")

const [editandoId,setEditandoId] = useState(null)

useEffect(() => {

async function cargarUsuarios(){

const dataUsuarios = await ServicioUsuarios.getUsuarios()

setUsuarios(dataUsuarios)

}

cargarUsuarios()

},[])



async function registroUsuario(){

if(!nombreUsuario || !correoUsuario || !contraseñaUsuario){

console.log("Todos los campos deben estar llenos")

return
}

const objUsuario = {

nombre:nombreUsuario,
correo:correoUsuario,
contraseña:contraseñaUsuario

}

const usuarioAlmacenado = await ServicioUsuarios.postUsuarios(objUsuario)

console.log(usuarioAlmacenado)

}



async function editar(id){

const objUsuario = {

nombre:nombreUsuario,
correo:correoUsuario,
contraseña:contraseñaUsuario

}

const valorEditado = await ServicioUsuarios.patchUsuarios(objUsuario,id)

console.log(valorEditado)

}


return (

<div>

<h2>Ingrese su nombre completo</h2>

<input 
type="text"
value={nombreUsuario}
onChange={(e)=>setNombreUsuario(e.target.value)}
/>

<h2>Ingrese su correo</h2>

<input
type="text"
value={correoUsuario}
onChange={(e)=>setCorreoUsuario(e.target.value)}
/>

<h2>Cree su contraseña</h2>

<input
type="text"
value={contraseñaUsuario}
onChange={(e)=>setContraseñaUsuario(e.target.value)}
/>

<button onClick={registroUsuario}>
Registrar
</button>


<div>

<Link to="/login">Iniciar sesión</Link>

</div>

</div>

)

}

export default FormRegistro