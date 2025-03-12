import { createItems, updatePrice, updateStock } from '../api/items.api.js'
import { createCates } from '../api/cat.api.js';
import { chargeSelect, chargeList } from '../components/cat.components.js';
import { getPrices, getIdByNam } from '../components/product.components.js';

const newItemForm = document.getElementById('newItem');
const newCatForm = document.getElementById('newCat')
const catSelect = document.getElementById('catSelect');
const catLst = document.getElementById('catLst')
const updateForm = document.getElementById('update');
const btnSearch = document.getElementById('buscarP');
const btnUpdP = document.getElementById('updP')
const btnUpdS = document.getElementById('updS')

window.addEventListener('DOMContentLoaded', async()=> {
  console.log('DOM cargado')
  await chargeSelect(catSelect)
  await chargeList(catLst)
})

newItemForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('nameInput').value;
  const desc = document.getElementById('descInput').value;
  const priceV = document.getElementById('priceVInput').value;
  const priceC = document.getElementById('priceCInput').value;
  const stock = document.getElementById('stockInput').value;
  const cat = catSelect.value
  const imageInput = document.getElementById('imageInput')
  const images = imageInput.files

  try {
      if (images && images.length > 0) { // Verificamos si hay archivos seleccionados
        const response = await createItems({ name, desc, priceV, priceC,stock, cat, images });
        console.log('Respuesta del servidor:', response);

        alert('Producto creado exitosamente');

        newItemForm.reset();
      } else {
          const response = await createItems({ name, desc, priceV, priceC, stock, cat, images: [] });//Se envia un array vacio si no se suben imagenes.
          console.log('Respuesta del servidor:', response);

          alert('Producto creado exitosamente, sin imagenes.');

          newItemForm.reset();
      }
  } catch (error) {
    console.error('Error al crear el producto:', error);
    
    alert('Error al crear el producto. Por favor, intentalo nuevamente.');
  }
});

newCatForm.addEventListener('submit', async (event) => {
   event.preventDefault();

   const name = document.getElementById('nameCat').value;

  try {
      const response = await createCates({name});
      console.log('Respuesta del servidor:', response); 
      
      alert('Categoria creada exitosamente');
      
      newCatForm.reset();
      chargeSelect(catSelect)
      chargeList(catLst)
    newItemForm.reset();
  } catch (error) {
      console.error('Error al crear la categoria:', error);
      alert('Error al crear la Categoria. Por favor, intentalo nuevamente.');
  }
})

btnSearch.addEventListener('click', async(e) => {
  e.preventDefault();
  const name = document.getElementById('namePInput').value
  try {
    await getPrices(name, updateForm);
  }catch (error) {
    console.error('Error al cargar el precio:', error);
    alert('Error al cargar el Precio. Por favor, intentalo nuevamente.');
  }
})

btnUpdP.addEventListener('click', async(e) => {
  e.preventDefault();

  const name = document.getElementById('namePInput').value
  const newPrice = document.getElementById('pricePInput').value
  
  try{
    const id = await getIdByNam(name)
    const response = await updatePrice(id, name, newPrice)
    console.log('Respuesta del servidor:', response);
    alert('Precio cargado exitosamente');
    updateForm.reset()
    }catch (error) {
      console.error('Error al cargar el precio:', error);
      
      alert('Error al cargar el Precio. Por favor, intentalo nuevamente.');
    }
})

btnUpdS.addEventListener('click', async(e) => {
  e.preventDefault();

  const name = document.getElementById('nameSInput').value
  const newStock = document.getElementById('stockSInput').value
  
  try{
    const id = await getIdByNam(name)
    const response = await updateStock(id, name, newStock)
    console.log('Respuesta del servidor:', response);
    alert('Stock cargado exitosamente');
    updateForm.reset()
    }catch (error) {
      console.log('Error al cargar el stock:', error);
      
      alert('Error al cargar el Stock. Por favor, intentalo nuevamente.');
    }
})