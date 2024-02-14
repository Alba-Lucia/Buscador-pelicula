const menuHamberguesa = document.getElementById("menu")
const activarMenu = document.querySelector('.sidebar__menu')

menuHamberguesa.addEventListener('click', (e) => {
    activarMenu.classList.toggle('active')
})