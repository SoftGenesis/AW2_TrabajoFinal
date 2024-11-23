import { getItemsById } from "../api/items.api.js"
import { card } from "./card.js"

export const renderCardById = async(id, cardContainer) =>{
    const productData = getItemsById(id)
    cardContainer.innerHTML = ''

    if(productData && productData.length > 0){
        productData.forEach(product => {
            const htmlCard = card(
                product.imagen,
                product.categoria,
                product.nombre,
                product.descripcion,
                `$${product.precio_venta}`
            )            
            cardContainer.innerHTML = htmlCard
        })
        
        /*const product = productData[0]*/
        
    }else {
        console.log("No se encontraron productos con ese ID.");
    }
}