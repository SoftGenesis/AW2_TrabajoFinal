import { Router } from "express"
import { findAll, findByName, createCat } from "../db/actions/category.actions.js"
import Category from "../db/schemas/category.schema.js"

const router = Router()

router.get('/all', async(req, res) =>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

router.get('/byName/:name', async(req, res) =>{
    const name = req.params.name
    try{
        const result = await findByName(name)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

//Dejar asi
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
      const category = await Category.findOne({ name });
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar la categoría' });
    }
  });

router.post('/create', async(req, res) =>{
    const {name} = req.body
    console.log(name)
    try{
        const result = await createCat({name})
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).json()
    }
})

export default router