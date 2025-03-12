import { Router } from "express"
import { connectToDatabase } from "../db/connection.js"
import User from "../db/schemas/users.schema.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findAll, findById, findByUsername, findByName, deleteById } from "../db/actions/users.actions.js"

/*Rutas de Usuarios*/
/*const fileUsers = await readFile('data/usuarios.json', 'utf8')
const userData = JSON.parse(fileUsers)*/
const router = Router()

const SECRET = 'ya_L4nFMMa7-eCuuaSP3LcXqyw7mvaUrbJWd3fyLFVqZyZw5NJbls5h-1r1cIJNi' //esto debberia estar en variables de entorno
//para mantenerlo de forma secreta. Son como si fueran variables globales dentro de toda la aplicacion. 
//Entonces no hay necesidad de estar recreando la variable secret 

//Rutas con GET
//Obtener TODOS los usuarios
router.get('/all', async(req, res) =>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.status(400).json()
    }
})

//Obtener info de Users con mismo nombre
router.get('/byName/:name', async(req, res) =>{
    const name = req.params.name
    try{
        const result = await findByName(name)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})


//Obtener info de un User con su ID
router.get('/byId/:id', async(req, res) =>{
    const id = req.params.id
    try{
        const result = await findById(id)
        res.status(200).json(result)
    }catch(e){
        
        res.status(400).json(e)
    }
})

//Obtener info de un User con su username
router.get('/byUsern/:username', async(req, res) =>{
    const username = req.params.username
    try{
        const result = await findByUsername(username)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

/*Ingresar User segun su mail*/
router.post('/login', async(req, res) =>{
    const { email, pass } = req.body

    try{
        await connectToDatabase()
        const result = await User.findOne({email:email})
        if(!result){
            return res.status(400).json({message: 'Usuario no encontrado'})
        }
        const controlPass = bcrypt.compareSync(pass, result.pass)// compareSync compara ambas password
        console.log(controlPass)

        if(!controlPass){
            return res.status(401).json({message: 'Contraseña incorrecta'})
        }
        
        const token = jwt.sign({...result.toObject()}, SECRET, {expiresIn: 86400})
        //result obtiene toda la informacion
        //86400 segundos = 1 dia = 24 horas

        res.status(200).json(token)
    }catch(error){
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})  

router.post('/create', async(req, res) =>{
    const {username, name, lastname, email, pass} = req.body
    try{
        const hashedPass = bcrypt.hashSync(pass, 8) 
        console.log(hashedPass)

        const result = await createUser({username, name, lastname, email, pass:hashedPass})
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.delete('/delUser/:id', async(req, res) =>{
    const id = req.params.id
    try{
        const result = await deleteById(id)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json(error)
    }
})

export default router