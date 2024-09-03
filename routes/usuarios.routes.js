import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import { get_user_inactivo } from "../utils/usuarios.js"

/*Rutas de Usuarios*/
const fileUsers = await readFile('data/usuarios.json', 'utf8')
const userData = JSON.parse(fileUsers)
const router = Router()

/*Ingresar User segun su nombre*/
router.post('/login', (req, res) =>{
    const email = req.body.email
    const pass = req.body.pass

    try{
        const result = userData.find(e => e.email == email && e.contraseña === pass)
        if(result){
            res.status(200).json(`Welcome ${result.nombre}`)
        }else{
            res.status(404).json(`${email} not founded...`)
        }
    }catch(error){
        res.status(500).json(error)
    }
})

router.delete('/delUser', (req, res) =>{
    try{
        const inactiveUsers = get_user_inactivo()
        if(inactiveUsers){
            res.status(200).json(`Vendedores eliminads con exito!!`)
            writeFile('./data/usuarios.json', JSON.stringify(inactiveUsers, null, 2))
        }else{
            res.status(400).json(`No existen vendedores inactivs`)
        }
    }catch(error){
        res.status(500).json(error)
    }
})

export default router