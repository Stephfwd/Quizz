async function getPrendas() {

    try {

        const respuestaServidor = await fetch("http://localhost:3000/prendas")
      
        
        const datosPrendas= await respuestaServidor.json();
   
        
        return datosPrendas;
        
    } catch (error) {
        
        console.error("Error al obtener los prendas", error);
    }


}





//POST USUARIOS AQUI S EVA A CREAR LA FUNCION PARA GUARDAR UN NUEVO USUARIO


async function postPrendas(prendas){

       try {

        const respuesta = await fetch("http://localhost:3000/prendas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(prendas)

        })

        const datosPrenda= await respuesta.json();

        return datosPrenda;
        
    } catch (error) {
        
        console.error("Error al obtener los prendas", error);
    }



}




//PUT


async function patchPrendas(prenda,id){

       try {

        const respuesta = await fetch("http://localhost:3000/prendas/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(prenda)

        })

        const datosPrendas= await respuesta.json();

        return datosPrendas;
        
    } catch (error) {
        
        console.error("Error al actualizar los cambios", error);
    }
}



//DELETE



async function deletePrendas(id){

       try {

        const respuesta = await fetch("http://localhost:3000/prendas/"+id,{
            method:"DELETE",
        })

        const datosPrendas= await respuesta.json();

        return datosPrendas;
        
    } catch (error) {
        
        console.error("Error al Eliminar el registro", error);
    }
}




export default {getPrendas,postPrendas,patchPrendas,deletePrendas}


