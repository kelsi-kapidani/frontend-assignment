import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imdbAPI = createApi({
    reducerPath: "imdbAPI",
    baseQuery: fetchBaseQuery ({
        baseUrl: "https://imdb236.p.rapidapi.com/api/imdb/",
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", "acfd396fa2mshca10120fc990c4fp199137jsn1f196f399e8e");
            headers.set("x-rapidapi-host", "imdb236.p.rapidapi.com");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchMovies: builder.query({ 
            query: ({name,genres}) => `search?originalTitle=${name}${genres}&sortOrder=DESC&sortField=id`,
        }),

        getMovie: builder.query({
            query: (id) => `${id}`, 
        }),
    }),
})

export const {useSearchMoviesQuery, useGetMovieQuery} = imdbAPI