import { Film } from "./films";

export async function getMovie(id: string | undefined) {

    const url = `https://imdb236.p.rapidapi.com/api/imdb/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'acfd396fa2mshca10120fc990c4fp199137jsn1f196f399e8e',
		    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };
    try {
	    const response = await fetch(url, options);
	    const jresponse = await response.json();
        console.log(jresponse);
        const movie: Film = {
            id: jresponse.id, 
            name: jresponse.primaryTitle || 'Unknown Title',
            poster: jresponse.primaryImage || '',
            description: jresponse.description || 'No description available.',
            genres: Array.isArray(jresponse.genres) ? jresponse.genres : [],
            rating: typeof jresponse.averageRating === 'number' ? jresponse.averageRating : 0,
          };
	    return movie;
    }catch (error) {
	    console.error(error);
}
}

export async function searchMovie(name: string | null, genres: string[]) {

    const translatedResults: Film[]=[];
    const genresParam = genres.length > 0 ? `&genres=${encodeURIComponent(JSON.stringify(genres))}` : '';
    const url = `https://imdb236.p.rapidapi.com/api/imdb/search?originalTitle=${name}${genresParam}&sortOrder=DESC&sortField=id`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'acfd396fa2mshca10120fc990c4fp199137jsn1f196f399e8e',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};


try {
	const response = await fetch(url, options);
	const jresponse = await response.json();
    console.log(jresponse);
    for (const item of jresponse.results) {
        const film: Film = {
            id: item.id,
            name: item.primaryTitle || 'Unknown Title',
            poster: item.primaryImage || '',
            description: item.description || 'No description available.',
            genres: Array.isArray(item.genres) ? item.genres : [],
            rating: typeof item.averageRating === 'number' ? item.averageRating : 0,
          };
        translatedResults.push(film);
    }
    return translatedResults;
    
} catch (error) {
	console.error(error);
}
}