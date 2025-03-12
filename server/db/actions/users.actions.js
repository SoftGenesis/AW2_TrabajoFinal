import { connectToDatabase } from "../connection.js";
import User from "../schemas/users.schema.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET = 'ya_L4nFMMa7-eCuuaSP3LcXqyw7mvaUrbJWd3fyLFVqZyZw5NJbls5h-1r1cIJNi'

export const createUser = async ({username, name, lastname, email, pass, compras}) =>{
    try {
        await connectToDatabase()
        const res = await User.create({username, name, lastname, email, pass, compras})
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

export const loginUser = async ({email, pass}) =>{
    try{
        await connectToDatabase()
        const user = await User.findOne({email:email})
            if(!user){
                return res.status(400).json({message: 'Usuario no encontrado'})
            }
            const controlPass = bcrypt.compareSync(pass, user.pass)// compareSync compara ambas password
            console.log(controlPass)
    
            if(!controlPass){
                return res.status(400).json({message: 'Contraseña incorrecta'})
            }
            
            const token = jwt.sign({...user},SECRET , {expiresIn: 86400})
            //result obtiene toda la informacion
            //86400 segundos = 1 dia = 24 horas
            return JSON.parse(JSON.stringify(token))
    }catch(e){
        console.log(e)
    }
}

export const findAll = async() =>{
    try{
        await connectToDatabase()
        const res = await User.find()/*.populate({path: "sales",
            populate: {path: "products", select: "nombre -_id",
                populate:{
                    path: "cat", select: "name -_id"
                }
            }
        })*/
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

export const findById = async(id) =>{
    try{
        await connectToDatabase()
        const res = await User.findById(id)/*.populate({path: "sales",
            populate: {path: "products", select: "nombre -_id",
                populate:{
                    path: "cat", select: "name -_id"
                }
            }
        })*/
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

export const findByUsername = async(username) =>{
    try{
        await connectToDatabase()
        const res = await User.find({username:username})/*.populate({path: "sales",
            populate: {path: "products", select: "nombre -_id",
                populate:{
                    path: "cat", select: "name -_id"
                }
            }
        })*/
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e)
    }
}

export const findByName = async(name) =>{
    try{
        await connectToDatabase()
        const res = await User.find({name: name})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const updateById = async(id, compras) =>{
    try{
        await connectToDatabase()
        const res = await User.findByIdAndUpdate(id, {compras: compras})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const deleteById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await User.findByIdAndDelete(id)
        return JSON.parse(JSON.stringify(res))
    }catch(e){
        console.log(e);
    }
}