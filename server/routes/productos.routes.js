import { Router } from "express"
import path from 'path'
import multer from 'multer'
import { createProd, findAll, findById, findByNamePop, findIdByName,
    findPriceByName, findByCat, updateById, updatePById, updateSById} from "../db/actions/product.actions.js"

const router = Router()

const storageStrategy = multer.diskStorage({
    destination: './assets',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const assets = multer({ storage: storageStrategy });

/////////Seccion Find con Get
router.get('/', async(req, res) =>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json()
    }
})

router.get('/findPriceByName/:name', async(req, res) =>{
    const name = req.params.name
    try{
        const result = await findPriceByName(name)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.get('/byNamePop/:name', async(req, res) =>{
    const name = req.params.nombre
    try{
        const result = await findByNamePop(name)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.get('/byName/:name', async(req, res) =>{
    const name = req.params.nombre
    try{
        const result = await findIdByName(name)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.get('/byId/:id', async(req, res) =>{
     const id = req.params.id
     try{
        const result = await findById(id)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.get('/byCat/:categoria', async(req, res) => {
    const categoria = req.params.categoria
    try{
        const result = await findByCat(categoria)
        res.status(200).json(result)
    }catch(error){
        res.status(590).json(error)
    }
})

///////////////Seccion Update con PUT
/*Cambiar Precio de cierto Item*/
router.put('/changePrice', async(req, res) =>{ 
    const id = parseInt(req.body.id)
    const newPrice = parseFloat(req.body.newP)
    const typePrice = parseFloat(req.body.typeP)

    try{
        const result = ""
        if(typePrice == 1){
            result = await updateBuyPrice(id, newPrice, typePrice)
        }else{
            result = await updateSalePrice(id, newPrice, typePrice)
        }
        console.log(result)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json(error)
    }
})

/*Cambiar nombre */
router.put('/updateName/:id', async(req, res) =>{
    const id = req.params.id
    const {nombre, descripcion} = req.body
    try{
        const result = await updateById(id, nombre, descripcion)
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.put('/updatePById/:id', async(req, res) =>{
    const id = req.params.id
    const {nombre, precio_venta} = req.body
    try{
        const result = await updatePById(id, nombre, precio_venta)
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.put('/updateSById/:id', async(req, res) =>{
    const id = req.params.id
    const {name, stock} = req.body
    try{
        const result = await updateSById(id, name, stock)
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

///////////Seccion Create con POST
router.post('/create', assets.array('images', 10), async(req, res) =>{
    const {nombre, descripcion, precio_compra, precio_venta, stock, categoria} = req.body
    console.log("req.files:", req.files); // Agregamos log
    try{
        const product = await createProd({nombre, descripcion, precio_compra, precio_venta, stock, categoria})
        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => path.join('./assets', file.originalname));
            product.images = imagePaths;
            await product.save();
        }
        //console.log(result)
        res.status(200).json(product)
    }catch(err){
        console.log(err)
        res.status(400).json()
    }
})

export default router