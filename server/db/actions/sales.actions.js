import { connectToDatabase } from "../connection.js";
import Sales from "../schemas/sales.schema.js"

export const createSale = async({products, total, user}) =>{
    try{
        await connectToDatabase()
        const res = await Sales.create({products, total, user})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}

export const findAll = async() =>{
    try{
        await connectToDatabase()
        const res = await Sales.find().populate({path: "products", select: "nombre precio_venta -_id", 
            populate: {
                path: "categoria", select: "name -_id"}
        }).populate({path: "user", select: "username email -_id"})
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

/*export const findById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await Sales.findById(id)/*.populate({path: "products", select: "nombre precio_venta -_id", 
            populate: {
                path: "categoria", select: "name -_id"}
        }).populate({path: "user", select: "username email -_id"})*/
        /*return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}*/

export const findById = async(id) =>{
    try{
        await connectToDatabase()
        const res = await Sales.findById(id).populate({path: "products", select: "nombre precio_venta -_id", 
            populate: {
                path: "categoria", select: "name -_id"}
        }).populate({path: "user", select: "username email -_id"})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

export const findByUser = async(userId)=>{
    try{
        await connectToDatabase()
        const res = await Sales.find({user: userId})/*.populate({path: "products", select: "name price -_id", 
            populate: {
                path: "cat", select: "name -_id"}
        })*/
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}
