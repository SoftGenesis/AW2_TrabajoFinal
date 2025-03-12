import { getAllCats } from "../api/cat.api.js";

//Cargar lista desplegable
export const chargeSelect = async(select) =>{
    const categorias = await getAllCats() 
    categorias.forEach((e) =>{
      const option = document.createElement("option")  
      option.classList.add("bg-slate-300", "rounded-md", "shadow", "overflow-hidden", "max-w-md", "items-center")
      option.value = e._id
      option.text = e.name
      select.appendChild(option)
    })
}

//Cargar lista
export const chargeList = async(tbody) =>{
    const categorias = await getAllCats() 
    categorias.forEach((e) =>{
        const tr =  document.createElement("tr")
        tr.classList.add("py-2")
        const td = document.createElement("td")
        td.classList.add("py-2", "border", "border-gray-200", "font-bold", "p-4")
        tr.value = e._id
        tr.textContent = e.name
        tr.appendChild(td)
        tbody.appendChild(tr)
    })
}