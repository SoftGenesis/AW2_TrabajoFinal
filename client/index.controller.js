import { getAllItems, getItemsByCat } from "./api/items.api.js"
import { crearArticulo } from "./components/card.js"

const categoryLinks = document.querySelectorAll('.category-link')
let arr = ["Remeras", "Pantalones", "Calzado", "Accesorios", "Vestido", "Bikini", "Camisas", "Abrigos","Faldas"]
const homeContent = document.querySelector('.home-content')
const articuloCard = document.querySelector('.articulo')
const card_container = document.querySelector('.card-container')

window.addEventListener('DOMContentLoaded', async() =>{
    console.log('DOM Cargado')
    await ObtenerItems()
})

const addToCart = (product, quantity) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []

    const existingProductIndex = cartItems.findIndex(item => item.title === product.title)

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += quantity
    } else {
        cartItems.push({ ...product, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
}

homeContent.addEventListener('click', async(e) =>{
    e.preventDefault()
    card_container.innerHTML = ''  
    await ObtenerItems()
})

categoryLinks.forEach(link =>{
    link.addEventListener('click', (e) =>{
        e.preventDefault()
        const category = link.textContent
        arr.filter(cat=>{
            if(cat == category){
                getItemsByCat(cat).then(productos =>{
                    const card_container = document.querySelector('.card-container')
                    card_container.innerHTML = ''

                    funcionProductos(productos) 
                })
                .catch(error =>{
                    console.log('Error al obtener productos: ', error)
                })
            }
        })
    })
})

const funcionProductos = (arr) =>{
    arr.forEach(producto =>{
        const articulo = crearArticulo(producto)
        card_container.appendChild(articulo)

        const addToCartButton = articulo.querySelector('.add-to-cart-button')
        addToCartButton.addEventListener('click', () => {
            const quantityInput = articulo.querySelector('.quantity-input')
            const quantity = parseInt(quantityInput.value, 10)
            addToCart(producto, quantity)
        })
    })
}

const ObtenerItems = async() =>{
    getAllItems().then(productos =>{
        const card_container = document.querySelector('.card-container')

        card_container.innerHTML = ''   
        funcionProductos(productos) 

    })
    .catch(error =>{
        console.log('Error al obtener productos: ', error)
    })
}