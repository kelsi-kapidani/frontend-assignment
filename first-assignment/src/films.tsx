export type Film = {
    id: number;
    name: string;
    poster: string;
    description: string;
    genres: string[];
    rating: number;
};

///database of films
export const filmDB: Film[]=[
    {id: 1, name: 'The Wolf Of Wall Street' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['comedy','drama','thriller','crime'] , rating: 4.6},
    {id: 2, name: 'The Dark Knight' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['action','drama','crime'] , rating: 4.5},
    {id: 3, name: 'Inception' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['action','sci-fi','thriller'] , rating: 4.4},
    {id: 4, name: 'Pulp Fiction' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['crime','drama'] , rating: 4.6},
    {id: 5, name: 'Forrest Gump' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['drama','romance'] , rating: 4.4},
    {id: 6, name: 'The Godfather' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['crime','drama'] , rating: 4.6},
    {id: 7, name: 'Parasite' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['drama','thriller'] , rating: 4.6},
    {id: 8, name: 'Avengers: Endgame' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['action','adventure','sci-fi'] , rating: 4.3},
    {id: 9, name: 'Interstellar' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['adventure','drama','sci-fi'] , rating: 4.2 },
    {id: 10, name: 'Fight Club' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['drama'] , rating: 4.3 },
    {id: 11, name: 'The Matrix' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['action','sci-fi'] , rating: 4.4 },
    {id: 12, name: 'The Shawshank Redemption' , poster: '/assets/no_image.jpeg' , description: '' , genres: ['drama'] , rating: 4.6 }
];

///function for search
export function searchFilmName (input: string| null) {

    const listOfMatches: Film[]=[];
    if (input===null) {
        return filmDB;
    }
    for (const film of filmDB) {
        if ((film.name.toLowerCase()).includes(input.toLowerCase())) {
            listOfMatches.push(film);
        }
    }

    return listOfMatches;
}

export function findFilm (input: number | undefined) {

    if (input===undefined) {
        return null;
    }
    for (const film of filmDB) {
        if (film.id===input) {
            return film;
        }
    }
     return null;
}