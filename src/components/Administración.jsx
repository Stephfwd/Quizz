import React, { useState, useEffect } from 'react'
import ServicioPrendas from '../services/ServicioPrendas'
import '../styles/Home.css'

function Administracion() {

const [prendas,setPrendas] = useState([])

const [title,setTitle] = useState("")
const [precio,setPrecio] = useState("")
const [imagen,setImagen] = useState("")

const [editandoId,setEditandoId] = useState(null)


useEffect(()=>{

cargarPrendas()

},[])


async function cargarPrendas(){

const data = await ServicioPrendas.getPrendas()

setPrendas(data)

}



async function guardarPrenda(){

if(!title || !precio || !imagen){

alert("Todos los campos son obligatorios")

return

}

const objPrenda = {
title,
precio,
imagen
}

if(editandoId){

await ServicioPrendas.patchPrendas(objPrenda,editandoId)

setEditandoId(null)

}else{

await ServicioPrendas.postPrendas(objPrenda)

}

setTitle("")
setPrecio("")
setImagen("")

cargarPrendas()

}



async function eliminarPrenda(id){

await ServicioPrendas.deletePrendas(id)

cargarPrendas()

}



function activarEdicion(prenda){

setEditandoId(prenda.id)

setTitle(prenda.title)
setPrecio(prenda.precio)
setImagen(prenda.imagen)

}



return(

<div className="home-container">

<h1>Panel Administrativo de Prendas</h1>


<h2>Agregar / Editar Prenda</h2>

<input
type="text"
placeholder="Nombre de la prenda"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
type="text"
placeholder="Precio"
value={precio}
onChange={(e)=>setPrecio(e.target.value)}
/>

<input
type="text"
placeholder="URL de la imagen"
value={imagen}
onChange={(e)=>setImagen(e.target.value)}
/>

<button onClick={guardarPrenda}>
{editandoId ? "Actualizar" : "Guardar"}
</button>



<h2>Catálogo</h2>

<div className="clothing-card-container">

{prendas.map(prenda =>(

<div key={prenda.id} className="card">

<img src={prenda.imagen} width="150"/>

<h3>{prenda.title}</h3>

<p>{prenda.precio}</p>

<button onClick={()=>activarEdicion(prenda)}>
Editar
</button>

<button onClick={()=>eliminarPrenda(prenda.id)}>
Eliminar
</button>

</div>

))}

</div>

</div>

)

}

export default Administracion