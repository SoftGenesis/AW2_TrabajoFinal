import { getAllItems, getItemsByCat } from "./api/items.api.js"
import { crearArticulo } from "./components/card.js"

const categoryLinks = document.querySelectorAll('.category-link')
let arr = ["Remeras", "Pantalones", "Calzado", "Accesorios", "Vestido", "Bikini", "Camisas", "Abrigos","Faldas"]
const homeContent = document.querySelector('.home-content')
const articuloCard = document.querySelector('.articulo')
const addToCartButton = document.querySelector('.add-to-cart-button');

const addToCart = (product, quantity) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cartItems.findIndex(item => item.title === product.title);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += quantity;
    } else {
        cartItems.push({ ...product, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
}

    getAllItems().then(productos =>{
        const card_container = document.querySelector('.card-container')
        
        productos.forEach(producto =>{
            const articulo = crearArticulo(producto)
            card_container.appendChild(articulo)
        })

        homeContent.addEventListener('click', () =>{
            card_container.innerHTML = ''
            productos.forEach(producto =>{
                const articulo = crearArticulo(producto)
                card_container.appendChild(articulo)

                addToCartButton.addEventListener('click', () => {
                    const quantityInput = articuloCard.querySelector('.quantity-input');
                    const quantity = parseInt(quantityInput.value, 10);
                    addToCart(producto, quantity);
                })
            }) 
        })

    })
    .catch(error =>{
        console.log('Error al obtener productos: ', error)
    })


categoryLinks.forEach(link =>{
    link.addEventListener('click', () =>{
        const category = link.textContent
        arr.map(cat=>{
            if(cat == category){
                getItemsByCat(cat).then(productos =>{
                    const card_container = document.querySelector('.card-container')
                    card_container.innerHTML = ''

                    productos.forEach(producto =>{
                        const articulo = crearArticulo(producto)
                        card_container.appendChild(articulo)

                        addToCartButton.addEventListener('click', () => {
                            const quantityInput = articulo.querySelector('.quantity-input');
                            const quantity = parseInt(quantityInput.value, 10);
                            addToCart(producto, quantity);
                        })
                    })
                })
                .catch(error =>{
                    console.log('Error al obtener productos: ', error)
                })
            }
        })
    })
})

