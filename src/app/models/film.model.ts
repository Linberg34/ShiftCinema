export interface Film {
    id: string;
    name: string;
    originalName: string;
    description: string;
    releaseDate: string;
    actors: Person[];
    directors: Person[];
    runtime: number;
    ageRating: string;
    genres: string[];
    userRatings: {
        kinopoisk: string;
        imdb: string;
    };
    img: string;
    country: Country;
}

export interface Person {
    id: string;
    professions: string;
    fullName: string;
}

export interface Country {
    name: string;
    code: string;
    code2: string;
    id: number;
}

export interface FilmResponse {
    success: boolean;
    reason: string;
    films: Film[];
}
