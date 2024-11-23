import { readFile } from 'fs/promises'

/*Rutas de Usuarios */
const fileUsers = await readFile('./data/usuarios.json', 'utf8')
const userData = JSON.parse(fileUsers)

export const get_user_byId = (id) =>{
    return userData.find(e => e.id === id)
}

export const get_user_inactivo = () =>{
    return userData.filter(e => e.activx !== false)
}