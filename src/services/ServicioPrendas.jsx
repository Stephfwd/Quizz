const BASE_URL = "http://localhost:3000";

async function getPrendas(endpoint = "prendas") {
    try {
        const respuestaServidor = await fetch(`${BASE_URL}/${endpoint}`);
        const datosPrendas = await respuestaServidor.json();
        return datosPrendas;
    } catch (error) {
        console.error(`Error al obtener los ${endpoint}`, error);
    }
}

async function postPrendas(prendas, endpoint = "prendas") {
    try {
        const respuesta = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prendas)
        });
        const datosPrenda = await respuesta.json();
        return datosPrenda;
    } catch (error) {
        console.error(`Error al crear en ${endpoint}`, error);
    }
}

async function patchPrendas(prenda, id, endpoint = "prendas") {
    try {
        // We use PUT for full replacement or PATCH for partial, 
        // the original code used PUT but called it patchPrendas.
        // I'll keep PATCH as it's more idiomatic for "patch".
        const respuesta = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prenda)
        });
        const datosPrendas = await respuesta.json();
        return datosPrendas;
    } catch (error) {
        console.error(`Error al actualizar en ${endpoint}`, error);
    }
}

async function deletePrendas(id, endpoint = "prendas") {
    try {
        const respuesta = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: "DELETE",
        });
        const datosPrendas = await respuesta.json();
        return datosPrendas;
    } catch (error) {
        console.error(`Error al eliminar en ${endpoint}`, error);
    }
}

export default { getPrendas, postPrendas, patchPrendas, deletePrendas }
