import obtenerGenero from './obtenerGenero';
import fetchGeneros from './fetchGeneros';

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
			resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
		});

		return resultados;
	} catch (e) {
		console.log(e);
	}
};

export default fetchPopulares;

// Obtener referencia al botón de siguiente
