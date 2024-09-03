import { readFile } from 'fs/promises'

/*Rutas de Productos */
const fileItems = await readFile('./data/productos.json', 'utf8')
const itemData = JSON.parse(fileItems)

export const get_item_byId = (id) =>{
    return itemData.filter(e => e.id === id)
}