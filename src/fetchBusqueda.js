import fetchGeneros from "./fetchGeneros";
import obtenerGeneros from "./obtenerGenero";

const fetchBUsqueda = async (pagina = 1) => {
  const tipo = document.querySelector(".main__filtros .btn--active").id;
  const idGenero = document.querySelector("#filtro-generos .btn--active")
    ?.dataset.id;
  const anioInicial = document.getElementById("años-min").value || 1950;
  const anioFinal = document.getElementById("años-max").value || 2024;

  let url;

  if (tipo === "movie") {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=2933f0d74f9b84b592f926afe45c7771&include_adult=false&include_video=false&language=es&page=${pagina}&release_date.gte=${anioInicial}&release_date.lte=${anioFinal}&sort_by=popularity.desc&with_genres=${idGenero}
    `;
  } else {
    url = `https://api.themoviedb.org/3/discover/tv?api_key=2933f0d74f9b84b592f926afe45c7771&first_air_date_year=${anioInicial}&first_air_date.gte=${anioFinal}&include_adult=false&include_null_first_air_dates=false&language=es&page=${pagina}&sort_by=popularity.desc&with_genres=${idGenero}
    `;
  }

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    const resultados = datos.results;

    const generos = await fetchGeneros()
    resultados.forEach((resultado) => {
        resultado.genero = obtenerGeneros(resultado.genre_ids[0], generos)
    });


    return resultados;

  } catch (error) {
    console.log("Hubo un error", error);
  }

};

export default fetchBUsqueda;
