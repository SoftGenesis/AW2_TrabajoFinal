import { API } from './api.js'

// Creacion de Categorias
export const createCats = async({name})=>{
    try{
        const res = await fetch(`http://localhost:3000/categorias/create`,{
            method:"POST",
            body: JSON.stringify({name}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(!res.ok){
            const errorData = await res.json()
            throw new Error(`Error al crear la categoria: ${errorData.message || res.statusText}`);
        }        
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        return {error: 'Error al obtener categorias'}
    }
}

export const createCates = async({name})=>{
    try{
        const res = await fetch(`${API}/categorias/create`,{
            method:"POST",
            body: JSON.stringify({name}),
            headers:{
                'Content-Type': 'application/json'
            }
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

//Mostrar todas las categorias
export const getAllCats = async () => {
    try{    
        const res = await fetch(`${API}/categorias/all`,{
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

//Mostrar Categoria Segun Nombre
export const getCategories = async (name) => {
    try{    
        const res = await fetch(`${API}/categorias/byName/${name}`,{
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