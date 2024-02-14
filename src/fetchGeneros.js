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

export default fetchGeneros;
