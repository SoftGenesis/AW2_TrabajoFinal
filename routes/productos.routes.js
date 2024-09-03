
import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'

/*Rutas de Productos*/
const fileItems = await readFile('data/productos.json', 'utf8')
const itemData = JSON.parse(fileItems)
const router = Router()

/*Obtener item por su Id*/
router.get('/byCat/:categoria', (req, res) => {
    const categoria = req.params.categoria
    
    try{
        const result = itemData.filter(e => e.categoria === categoria)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`Categoria no existente...`)
        }
    }catch(error){
        res.status(590).json(error)
    }
})

/*Cambiar Precio de cierto Item*/
router.put('/changePrice', (req, res) =>{ 
    const id = parseInt(req.body.id)
    const newPrice = parseFloat(req.body.newP)
    const typePrice = parseFloat(req.body.typeP)

    try{
        const index = itemData.findIndex(e => e.id === id)
        if(typePrice == 1){
            itemData[index].precio_compra = newPrice
        }else{
            itemData[index].precio_venta = newPrice
        }
        writeFile('./data/productos.json', JSON.stringify(itemData, null, 2))
        res.status(200).json(`Precio del producto modificado`)
    }catch(error){
        res.status(500).json(error)
    }
})

export default router