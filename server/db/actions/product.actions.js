import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product.schema.js"

////////Seccion Find
export const findAll = async() => {
    try{
        await connectToDatabase()
        const res = await Product.find().populate({path:"categoria", select: "nombre -_id"})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(err){
        console.log(err)
    }
}

export const findById = async(id) => {
    try{
        await connectToDatabase()
        const res = await Product.findById(id).populate({path:"categoria", select: "nombre -_id"})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(err){
        console.log(err)
    }
}

export const findByCat = async(cat) => {
    try{
        await connectToDatabase()
        const res = await Product.find({categoria:cat}).populate({path:"categoria", select: "nombre -_id"})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(err){
        console.log(err)
    }
}

export const findByNamePop = async(name) =>{
    try{
        await connectToDatabase()
        const res = await Product.find({nombre: name}).populate({path:"categoria", select: "nombre -_id"})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const findIdByName = async(name) =>{
    try{
        await connectToDatabase()
        const res = await Product.find({nombre: name}, "_id")
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const findPriceByName = async(name) =>{
    try{
        await connectToDatabase()
        const res = await Product.find({nombre: name}, "precio_venta -_id")
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

////////Seccion Update
//Actualiza Precio Venta
export const updateSalePrice = async(id, name, precio_venta) =>{
    try{
        await connectToDatabase()
        const res = Product.findByIdAndUpdate(id, {nombre: name, precio_venta: precio_venta})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(err){
        console.log(err)
    }
}

//Actualiza Precio Compra
export const updateBuyPrice = async(id, name, precio_compra) =>{
    try{
        await connectToDatabase()
        const res = Product.findByIdAndUpdate(id, {nombre: name, precio_compra: precio_compra})
        console.log(res)
        return JSON.parse(JSON.stringify(res))
    }catch(err){
        console.log(err)
    }
}

//Actualiza Nombre y Descripcion
export const updateById = async(id, name, desc) =>{
    try{
        await connectToDatabase()
        const res = await Product.findByIdAndUpdate(id, {nombre: name, descripcion: desc})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const updatePById = async(id, nombre, precio_venta) =>{
    try{
        await connectToDatabase()
        const res = await Product.findByIdAndUpdate(id, {nombre: nombre, precio_venta: precio_venta})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const updateSById = async(id, nombre, stock) =>{
    try{
        await connectToDatabase()
        const res = await Product.findByIdAndUpdate(id, {nombre: nombre, stock: stock})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

////////Seccion Create
export const createProd = async({nombre, descripcion, precio_compra, precio_venta, stock, categoria}) => {
    try{
        await connectToDatabase()
        const res = await Product.create({nombre, descripcion, precio_compra, precio_venta, stock, categoria})
        return res
    }catch(err){
        console.log(err)
    }
}