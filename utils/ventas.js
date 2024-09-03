import { readFile } from 'fs/promises'
import { get_item_byId } from '../utils/productos.js'

/*Rutas de Usuarios */
const fileSales = await readFile('./data/ventas.json', 'utf8')
const salesData = JSON.parse(fileSales)

export const get_arr_nameItem = (id) =>{
    salesData.map(e => {
        let aux_name_item = get_item_byId(id)
        return {
            item : aux_name_item,
            cantidad : e.cantidad
        }
    })
}