import express from "express"
import cors from "cors"
//import multer from "multer"
//import {readFile, writeFile} from 'fs/promises'

import userRouter from './routes/usuarios.routes.js'
import salesRouter from './routes/ventas.routes.js'
import itemRouter from './routes/productos.routes.js'
import categoryRoutes from './routes/categoria.routes.js'
import 'dotenv/config'
//Este ultimo import sirve para utilizar variables de entorno



const port = process.env.PORT//process.env.nombreVariable se utiliza para poder reutilizar una variable de entorno

const app = express()

app.use(express.json());
app.use(express.static('./client'))

app.listen(port, () =>{
    console.log(`Servidor escuchando en ${port}`)
})

app.use(cors({
    origin: 'http://127.0.0.1:5502'
}))

app.use('/usuarios', userRouter)
app.use('/productos/', itemRouter)
app.use('/ventas/', salesRouter)
app.use('/categorias', categoryRoutes)