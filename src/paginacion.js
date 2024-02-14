import cargarTitulos from "./cargarTitulos";
import fetchBUsqueda from "./fetchBusqueda";
import fetchPopulares from "./fetchPopulares";

const anterior = document.getElementById("pagina-anterior");
const siguiente = document.getElementById("pagina-siguiente");

siguiente.addEventListener("click", async (e) => {
  let paginaActual = document.getElementById("populares").dataset.pagina;

  try {
    const resultados = await fetchBUsqueda(paginaActual + 1);
    fetchPopulares(resultados)
    document
      .getElementById("populares")
      .setAttribute("data-pagina", parseInt(paginaActual) + 1);
    cargarTitulos(resultados);
    window.scrollTo(0, 0);
    console.log(resultados)
  } catch (error) {
    console.log(error);
  }
});
 
anterior.addEventListener("click", async (e) => {
  const paginaActual = parseInt(document.getElementById("populares").dataset.pagina);
  if (paginaActual > 1) {
    try {
      const resultados = await fetchBUsqueda(paginaActual - 1);
      document
        .getElementById("populares")
        .setAttribute("data-pagina", parseInt(paginaActual) - 1);
      cargarTitulos(resultados);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  }
});



// import cargarTitulos from "./cargarTitulos";
// import fetchBUsqueda from "./fetchBusqueda";
// import fetchPopulares from "./fetchPopulares";

// const anterior = document.getElementById("pagina-anterior");
// const siguiente = document.getElementById("pagina-siguiente");

// siguiente.addEventListener("click", async (e) => {
//   let paginaActual = parseInt(document.getElementById("populares").dataset.pagina);

//   try {
//     const resultados = await fetchPopulares('movie', paginaActual + 1) || fetchBUsqueda('movie', paginaActual + 1);
//     document
//       .getElementById("populares")
//       .setAttribute("data-pagina", paginaActual + 1);
//     cargarTitulos(resultados);
//     window.scrollTo(0, 0);
//     console.log(resultados);
//   } catch (error) {
//     console.log(error);
//   }
// });
 
// anterior.addEventListener("click", async (e) => {
//   const paginaActual = parseInt(document.getElementById("populares").dataset.pagina);
//   if (paginaActual > 1) {
//     try {
//       const resultados = await fetchBUsqueda('movie', paginaActual + 1, generoActual);
//       document
//         .getElementById("populares")
//         .setAttribute("data-pagina", paginaActual - 1);
//       cargarTitulos(resultados);
//       window.scrollTo(0, 0);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });
