import express from "express"
import {readFile, writeFile} from 'fs/promises'

import userRouter from './routes/usuarios.routes.js'
import salesRouter from './routes/ventas.routes.js'
import itemRouter from './routes/productos.routes.js'


const app = express()

const port = 3008

app.use(express.json());

app.listen(port, () =>{
    console.log(`Servidor escuchando en ${port}`)
})

app.use('/usuarios', userRouter)
app.use('/productos/', itemRouter)
app.use('/ventas/', salesRouter)