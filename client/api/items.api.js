import { API } from "./api.js"

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