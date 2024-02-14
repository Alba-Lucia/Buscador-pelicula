import fetchPopulares from "./fetchPopulares";
import cargarTitulos from "./cargarTitulos";
import "./listenerFiltroTipo";
import "./listenerFiltroGeneros";
import "./listenerBuscar";
import "./paginacionPopulares";
import "./menuHamburguesa";
import "./listenerIten";
import "./listenerPopup";
// import "./paginacion";

import cargarGeneros from "./cargarGeneros";

const cargar = async () => {
  // Obtenemos los resultados.
  const resultados = await fetchPopulares("movie");

  if (resultados) {
    // Los cargamos en el DOM.
    cargarTitulos(resultados);
  }
};

cargar();
cargarGeneros("movie");
