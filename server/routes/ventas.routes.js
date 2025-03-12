import { Router } from "express"
import { readFile } from 'fs/promises'
import { get_user_byId } from '../utils/usuarios.js'
import { get_item_byId } from '../utils/productos.js'
import { createSale, findById, findAll, findByUser } from "../db/actions/sales.actions.js"

/*Rutas de Ventas*/
const fileSales = await readFile('data/ventas.json', 'utf8')
const salesData = JSON.parse(fileSales)
const router = Router()

//crear Ventas
router.post('/create', async(req, res) =>{
    const {products, total, user} = req.body
    try{
        const result = await createSale({products, total, user})
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

/*Obtener todas las ventas - Primero mapea el subarray productos (que esta dentro de ventas.json), luego mapea 
el array de items obtenido del productos.json para que de el nombre de cada producto, y para indicar la cantidad
de cada producto expuesta en el subarray de ventas.json tome la variable del primer mapeo*/
router.post('/all', (req, res) =>{
    let aux_name
    let aux_item
    try{
        const result = salesData.map(e =>{
            aux_name = get_user_byId(e.id_usuario)
            aux_name = aux_name.nombre + ' ' + aux_name.apellido
            const prod = e.productos.map(p => {
                aux_item = get_item_byId(p.id_p).map(a => {
                    return {
                        producto: a.nombre,
                        cantidad: p.cantidad
                    }
                })
                return aux_item
            })
            return {
                id : e.id,
                usuario : aux_name,
                fecha : e.fecha,
                total : e.total,
                direccion : e.direccion,
                productos : prod
                }
        })
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json(`No existen ventas...`)
        }
    }
    catch(error){
        res.status(500).json(error)
    }
})

/*Obtener ventas en un cierto periodo*/
router.get('/:from/:to', (req, res) =>{
    const from = req.params.from
    const to = req.params.to

    try{
        const result = salesData.filter(e => e.fecha >= from && e.fecha <= to)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`No se registran ventas entre las fechas ${from} y ${to}`)
        }
    }catch(error){
        res.status(500).json(error)
    }
})

router.get('/all', async(req, res) =>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})


router.get('/byId', async(req, res) =>{
    const id = req.body
    try{
        const result = await findById(id)
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json(e)
    }
})

router.get('/byUser', async(req, res) =>{
    const userId = req.body
    try{
        const result = await findByUser(userId)
        console.log(result)
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(400).json(e)
    }
})

export default router