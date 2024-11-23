const categoriesButton = document.querySelector('.relative')
const categoriesMenu = document.querySelector('.absolute')

categoriesButton.addEventListener('mouseenter', () => {
    categoriesMenu.classList.remove('hidden')
    categoriesMenu.classList.add('visible')
    categoriesMenu.classList.add('transition-opacity')
    categoriesMenu.classList.add('duration-1000')
    categoriesMenu.classList.add('delay-1000')
  })

  categoriesButton.addEventListener('mouseleave', () => {
    categoriesMenu.classList.add('hidden')
    categoriesMenu.classList.remove('visible')
  })


