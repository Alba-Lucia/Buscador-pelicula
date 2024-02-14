
import cargarTitulos from "./cargarTitulos";
import fetchPopulares from "./fetchPopulares";
import fetchBUsqueda from "./fetchBusqueda";

const siguiente = document.getElementById("pagina-siguiente");
const anterior = document.getElementById("pagina-anterior");


// Variable para mantener el estado del género seleccionado
let generoActual = null;

siguiente.addEventListener("click", async (e) => {
  let paginaActual = parseInt(document.getElementById("populares").dataset.pagina);
  let tipo = document.querySelector('.main__filtros .btn--active').id;

  try {
    let resultados;
    if (generoActual !== null) {
      // Si hay un género seleccionado, realizar la paginación de búsqueda dentro de ese género
      resultados = await fetchBUsqueda(paginaActual + 1, generoActual);
    } else {
      // Si no, realizar la paginación de los resultados populares
      resultados = await fetchPopulares(`${tipo}`, paginaActual + 1);
    }
    
    // Cargar los resultados en el DOM
    cargarTitulos(resultados);
    
    // Actualizar el atributo data-pagina
    document.getElementById("populares").setAttribute("data-pagina", paginaActual + 1);
    
    // Desplazar a la parte superior de la página
    window.scrollTo(0, 0);
  } catch (error) {
    console.log(error);
  }
});

anterior.addEventListener("click", async (e) => {
  let paginaActual = parseInt(document.getElementById("populares").dataset.pagina);

  try {
    let resultados;
    if (generoActual !== null) {
      // Si hay un género seleccionado, realizar la paginación de búsqueda dentro de ese género
      resultados = await fetchBUsqueda(paginaActual - 1, generoActual);
    } else {
      // Si no, realizar la paginación de los resultados populares
      resultados = await fetchPopulares(`${tipo}`, paginaActual - 1);
    }
    
    // Cargar los resultados en el DOM
    cargarTitulos(resultados);
    
    // Actualizar el atributo data-pagina
    document.getElementById("populares").setAttribute("data-pagina", paginaActual - 1);
    
    // Desplazar a la parte superior de la página
    window.scrollTo(0, 0);
  } catch (error) {
    console.log(error);
  }
});

// anterior.addEventListener("click", async (e) => {
//   const paginaActual = parseInt(document.getElementById("populares").dataset.pagina);
//   if (paginaActual > 1) {
//     try {
//       let resultados;
//       if (generoActual !== null) {
//         // Si hay un género seleccionado, obtener la página anterior de búsqueda dentro de ese género
//         resultados = await fetchBUsqueda(paginaActual - 1, generoActual);
//       } else {
//         // Si no, obtener la página anterior de los resultados populares
//         resultados = await fetchPopulares(paginaActual - 1);
//       }
      
//       // Cargar los resultados en el DOM
//       cargarTitulos(resultados);
      
//       // Actualizar el atributo data-pagina
//       document.getElementById("populares").setAttribute("data-pagina", paginaActual - 1);
      
//       // Desplazar a la parte superior de la página
//       window.scrollTo(0, 0);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

// Agregar un listener para actualizar el género actual cuando se selecciona uno nuevo
const contenedorGeneros = document.getElementById('filtro-generos');
contenedorGeneros.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button')) {
    // Eliminar la clase active de cualquier otro botón
    contenedorGeneros.querySelector('.btn--active')?.classList.remove('btn--active');

    // Agregar la clase active al botón clicado
    e.target.classList.add('btn--active');

    // Obtener el ID del género seleccionado
    generoActual = e.target.dataset.id;
  }
});
