import jwt from 'jsonwebtoken'
const SECRET = 'ya_L4nFMMa7-eCuuaSP3LcXqyw7mvaUrbJWd3fyLFVqZyZw5NJbls5h-1r1cIJNi'

//Esta funcion se utiliza cada vez que el usuario quiera agregar un nuevo contacto
export const verifyToken = async(token) =>{
    console.log(token)
    if(!token){
        return false
    }

    try{
        const decode = await jwt.verify(token, SECRET)
        console.log(decode)
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const decodeToken = async(token) =>{
    if(!verifyToken){
        return false
    }

    const decode = await jwt.verify(token, SECRET)
    return decode//Devuelve el objeto completo con toda la info
}
