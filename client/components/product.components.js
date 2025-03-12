import { getPricesByName, getIdByName, getItemsById } from "../api/items.api.js";

//Cargar Precio antiguo
export const getPrices = async(name, form) =>{
    const prices = await getPricesByName(name)
    const precio = prices[0].price;
    const labprecioViejo = document.createElement('label')
    labprecioViejo.classList.add("w-full", "p-3", "border", "border-gray-300", "rounded-md", 
        "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500")
    labprecioViejo.innerHTML = `Precio Anterior: $${precio}`
    form.appendChild(labprecioViejo)
    const br = document.createElement('br')
    form.appendChild(br)
    const br2 = br.cloneNode(true)
    form.appendChild(br2)
}

export const getIdByNam = async(name) => {
    const string = await getIdByName(name)
    const id = string[0]._id
    return id
}

export const getStockById = async(id) => {
    const string = await getItemsById(id)
    const stock = string[0].stock
    return stock
}