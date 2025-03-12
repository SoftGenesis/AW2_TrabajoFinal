import { API } from "./api.js"

//Get de Productos con Filtros
export const getAllItems = async () =>{
    try{
        const res = await fetch(`${API}/productos`, {
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            throw new Error("Error: ${res.status}");
        }        
        const data = await res.json()
        return data
    }
    catch(error){
        console.log(error)
        return {error: 'Error al obtener productos'}
    }
}

export const getItemsById = async(id)=>{
    try{
        const res = await fetch(`${API}/productos/byId/${id}`,{
            method:"GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if(!res.ok){
            throw new Error("Error: ${res.status}");
        }        
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        return {error: 'Error al obtener productos'}
    }
}

export const getItemsByCat = async(cat)=>{
    try{
        const res = await fetch(`${API}/productos/byCat/${cat}`,{
            method:"GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if(!res.ok){
            throw new Error("Error: ${res.status}");
        }        
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        return {error: 'Error al obtener productos'}
    }
}

//Mostrar Id del Producto a partir del nombre
export const getIdByName = async(name) => {
    try{    
        const res = await fetch(`${API}/productos/byName/${name}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            throw new Error(`Error: ${res.status}`);
        }        
        const data = await res.json()
        return data
    }catch(err){
        console.log(err)
        return {err: 'Error al obtener productos'}
    }
}

//Mostrar Precios de Productos desde el Nombre 
export const getPricesByName = async(name) => {
    try{    
        const res = await fetch(`${API}/productos/findPriceByName/${name}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            throw new Error(`Error: ${res.status}`);
        }        
        const data = await res.json()
        return data
    }catch(err){
        console.log(err)
        return {err: 'Error al obtener productos'}
    }
}

// Creacion de Productos
export const createItems = async({nombre, descripcion, precio_compra, precio_venta, stock, categoria, imagen})=>{
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio_compra', precio_compra);
    formData.append('precio_venta', precio_venta);
    formData.append('stock', stock);
    formData.append('categoria', categoria);

    if (imagen && imagen.length > 0) {
        for (let i = 0; i < imagen.length; i++) { 
            formData.append('imagen', imagen[i]);
        }
    }

    try{
        const res = await fetch(`${API}/productos/create`,{
            method:"POST",
            body: formData
        })
        
        if(!res.ok){
            const errorData = await res.json()
            throw new Error(`Error al crear el producto: ${errorData.message || res.statusText}`);
        }        
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        return {error: 'Error al obtener productos'}
    }
}


//Actualizar Precio
export const updatePrice = async(id, nombre, precio_venta) => {
    try{    
        const res = await fetch(`${API}/productos/updatePById/${id}`,{
            method: 'PUT',
            body: JSON.stringify({nombre, precio_venta}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            throw new Error(`Error: ${res.status}`);
        }        
        const data = await res.json()
        return data
    }catch(err){
        console.log(err)
        return {err: 'Error al obtener productos'}
    }
}

//Actualizar Precio
export const updateStock = async(id, name, stock) => {
    try{    
        const res = await fetch(`${API}/productos/updateSById/${id}`,{
            method: 'PUT',
            body: JSON.stringify({name, stock}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            throw new Error(`Error: ${res.status}`);
        }        
        const data = await res.json()
        return data
    }catch(err){
        console.log(err)
        return {err: 'Error al obtener productos'}
    }
}
