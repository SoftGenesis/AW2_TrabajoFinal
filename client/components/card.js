export function crearArticulo(item) {
    const rutaImagenes = '/server/assets/'
    const articulo = document.createElement("article")
    articulo.classList.add("bg-slate-300", "rounded-md", "shadow", "overflow-hidden", "max-w-md", "items-center")
    articulo.classList.add("card");
    articulo.innerHTML = 
    `
            <!--encabezado-->
            <div class="h-96">
                <img class="h-full w-full object-contain object-bottom"
                src="${rutaImagenes}${item.imagen}" alt="${item.nombre}">
            </div>
            <!--Contenido-->
            <div class="p-5 space-y-3 flex-1">
                <h3 class="text-sm text-sky-500 font-semibold">${item.categoria}</h3>
                <h2 class="text-xl text-slate-700 font-semibold leading-relaxed">${item.nombre}</h2>
                <p class="text-lg text-slate-700">${item.descripcion}</p>
            </div>
            <!--footer-->
            <div class="flex space-x-6 p-5 text-xl text-blue-700 font-semibold shadow">
                <h4>$${item.precio_venta}</h4>
                <label for="quantity">Cantidad:</label>
                <input type="number" class="quantity-input h-8 w-10" id="quantity" value="1" min="1">
                <button class="add-to-cart-button h-8 w-8 bg-sky-300 rounded-lg border-t hover:text-sky-300 hover:bg-white transition-colors">+</button>
            </div>
    `
    return articulo
}