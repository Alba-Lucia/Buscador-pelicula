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

export default fetchItem;
