async function getUsuarios() {

    try {

        const respuestaServidor = await fetch("http://localhost:3000/usuarios")


        const datosUsuarios = await respuestaServidor.json();


        return datosUsuarios;

    } catch (error) {

        console.error("Error al obtener los usuarios", error);
    }


}





//POST USUARIOS AQUI S EVA A CREAR LA FUNCION PARA GUARDAR UN NUEVO USUARIO


async function postUsuarios(usuarios) {

    try {

        const respuesta = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios)

        })

        const datosUsuarios = await respuesta.json();

        return datosUsuarios;

    } catch (error) {

        console.error("Error al obtener los usuarios", error);
    }



}




//PUT


async function patchUsuarios(usuarios, id) {

    try {

        const respuesta = await fetch("http://localhost:3000/usuarios/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarios)

        })

        const datosUsuarios = await respuesta.json();

        return datosUsuarios;

    } catch (error) {

        console.error("Error al actualizar los cambios", error);
    }
}



//DELETE



async function deleteUsuarios(id) {

    try {

        const respuesta = await fetch("http://localhost:3000/usuarios/" + id, {
            method: "DELETE",
        })

        const datosUsuarios = await respuesta.json();

        return datosUsuarios;

    } catch (error) {

        console.error("Error al Eliminar el registro", error);
    }
}




export default { postUsuarios, getUsuarios, patchUsuarios, deleteUsuarios }


