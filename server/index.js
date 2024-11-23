import express from "express"
import cors from "cors"
//import {readFile, writeFile} from 'fs/promises'

import userRouter from './routes/usuarios.routes.js'
import salesRouter from './routes/ventas.routes.js'
import itemRouter from './routes/productos.routes.js'


const app = express()

const port = 3007

app.use(express.json());
app.use(express.static('./client'))

app.listen(port, () =>{
    console.log(`Servidor escuchando en ${port}`)
})

app.use(cors({
    origin: 'http://127.0.0.1:5501'
}))

app.use('/usuarios', userRouter)
app.use('/productos/', itemRouter)
app.use('/ventas/', salesRouter)