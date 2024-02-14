'use strict';

const obtenerGeneros = (id, generos) => {
  let nombre;

  generos.forEach((elemento) => {
    if (id === elemento.id) nombre = elemento.name;
  });
  return nombre;
};

const fetchGeneros = async (filtro = 'movie') => {
	const tipo = filtro === 'movie' ? 'movie' : 'tv';
	const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=2933f0d74f9b84b592f926afe45c7771&language=es-MX`;

	try {
		const resultados = await fetch(url);
		const datos = await resultados.json();
		return datos.genres;
	} catch (e) {
		console.log(e);
	}
};

// const anterior = document.getElementById("pagina-anterior");
// const siguiente = document.getElementById("pagina-siguiente");

// let pagina = 1; // Inicializa la página actual
// const siguiente2 = document.getElementById("pagina-siguiente");

// // Variable para almacenar la página actual
// let paginaActual = 1;

// // Event listener para el botón "Siguiente"
// siguiente2.addEventListener("click", async (e) => {
//     // Incrementar el número de página
//     paginaActual++;

//     try {
//         // Obtener los resultados con la nueva página
//         const resultados = await fetchPopulares('movie', paginaActual);
        
//         // Aquí puedes cargar los resultados en tu aplicación según sea necesario
//         console.log(resultados);
//     } catch (error) {
//         console.log(error);
//     }
// });

const fetchPopulares = async (filtro = 'movie', pagina = 1) => {
	const tipo = filtro === 'movie' ? 'movie' : 'tv';
	const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=2933f0d74f9b84b592f926afe45c7771&language=es-MX&region=US&page=${pagina}`;
	const generos = await fetchGeneros(tipo);

	try {
		const respuesta = await fetch(url);
		const datos = await respuesta.json();
		const resultados = datos.results;

		// Obtenemos el genero de cada resultado y lo agregamos al objeto de resultados.
		resultados.forEach((resultado) => {
			resultado.genero = obtenerGeneros(resultado.genre_ids[0], generos);
		});

		return resultados;
	} catch (e) {
		console.log(e);
	}
};

// Obtener referencia al botón de siguiente

const cargarTitulos = (resultados) => {
  const contenedor = document.querySelector("#populares .main__grid");

  contenedor.innerHTML = '';
  
  resultados.forEach((resultado) => {
    const plantilla = `
    <div class="main__media" data-id="${resultado.id}">
        <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}.jpg" alt="" />
        </a>
        <p class="main__media-titulo">${resultado.title || resultado.name}</p>
        <p class="main__media-fecha">${resultado.genero}</p>
    </div>
  `;
    contenedor.insertAdjacentHTML("beforeend", plantilla);
  });
};

const contenedorGeneros$1 = document.getElementById('filtro-generos');

const cargarGeneros = async (filtro) => {
	contenedorGeneros$1.innerHTML = '';

	const generos = await fetchGeneros(filtro);
	generos.forEach((genero) => {
		const btn = document.createElement('button');
		btn.classList.add('btn');
		btn.innerText = genero.name;
		btn.setAttribute('data-id', genero.id);
		contenedorGeneros$1.appendChild(btn);
	});
};

const filtroPelicula = document.getElementById('movie');
const filtroShow = document.getElementById('tv');

filtroPelicula.addEventListener('click', async (e) => {
	e.preventDefault();

	// Cargamos los generos en la barra lateral.
	cargarGeneros('movie');

	// Obtenemos los resultados.
	const resultados = await fetchPopulares('movie');

	// Los cargamos en el DOM.
	cargarTitulos(resultados);

	filtroShow.classList.remove('btn--active');
	filtroPelicula.classList.add('btn--active');
	document.querySelector('#populares .main__titulo').innerText = 'Peliculas Populares';
});

filtroShow.addEventListener('click', async (e) => {
	e.preventDefault();

	// Cargamos los generos en la barra lateral.
	cargarGeneros('tv');

	// Obtenemos los resultados.
	const resultados = await fetchPopulares('tv');

	// Los cargamos en el DOM.
	cargarTitulos(resultados);

	filtroPelicula.classList.remove('btn--active');
	filtroShow.classList.add('btn--active');
	document.querySelector('#populares .main__titulo').innerText = 'Series Populares';
});

const contenedor$1 = document.getElementById('filtro-generos');
contenedor$1.addEventListener('click', (e) => {
	e.preventDefault();

	if (e.target.closest('button')) {
		// Eliminamos la clase active de cualquier otro boton.
		contenedor$1.querySelector('.btn--active')?.classList.remove('btn--active');

		// Agregamos la clase active al boton que clickamos.
		e.target.classList.add('btn--active');
	}
});

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

    const generos = await fetchGeneros();
    resultados.forEach((resultado) => {
        resultado.genero = obtenerGeneros(resultado.genre_ids[0], generos);
    });


    return resultados;

  } catch (error) {
    console.log("Hubo un error", error);
  }

};

const btn = document.getElementById('btn-buscar');

btn.addEventListener('click', async (e) => {
	e.preventDefault();

	const resultados = await fetchBUsqueda();
	cargarTitulos(resultados);
});

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

const menuHamberguesa = document.getElementById("menu");
const activarMenu = document.querySelector('.sidebar__menu');

menuHamberguesa.addEventListener('click', (e) => {
    activarMenu.classList.toggle('active');
});

const fetchItem = async (id) => {
	const tipo = document.querySelector('.main__filtros .btn--active').id;

	try {
		const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=2933f0d74f9b84b592f926afe45c7771&language=es-MX`;

		const respuesta = await fetch(url);
		const datos = await respuesta.json();

		return datos;
	} catch (e) {
		console.log(e);
	}
};

const contenedor = document.getElementById('populares');
const popup$1 = document.getElementById('media');

contenedor.addEventListener('click', async (e) => {
	if (e.target.closest('.main__media')) {
		// Activamos el popup.
		popup$1.classList.add('media--active');

		// Obtenemos el ID del elemento clickeado.
		const id = e.target.closest('.main__media').dataset.id;

		// Hacemos fetch de la media.
		const resultado = await fetchItem(id);

		const plantilla = `
			<div class="media__backdrop">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
					class="media__backdrop-image"
				/>
			</div>
			<div class="media__imagen">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
					class="media__poster"
				/>
			</div>
			<div class="media__info">
				<h1 class="media__titulo">${resultado.title || resultado.name}</h1>
				<p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
				<p class="media__overview">${resultado.overview}</p>
			</div>
			<button class="media__btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					class="media__btn-icono"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
					/>
				</svg>
			</button>
		`;

		document.querySelector('.media .media__contenedor').innerHTML = plantilla;
	}
});

const popup = document.getElementById('media');

popup.addEventListener('click', (e) => {
    if(e.target.closest('button')){
        popup.classList.remove('media--active');
    }
});

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
//# sourceMappingURL=bundle.js.map
