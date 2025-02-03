export interface Film {
    id: string;
    name: string;
    originalName: string;
    description: string;
    releaseDate: string;
    actors: {
        id: string;
        professions: string;
        fullName: string;
    }[];
    directors: {
        id: string;
        professions: string;
        fullName: string;
    }[];
    runtime: number;
    ageRating: string;
    genres: string[];
    userRatings: {
        kinopoisk: string;
        imdb: string;
    };
    img: string;
    country: {
        name: string;
        code: string;
        code2: string;
        id: number;
    };
}

export interface Hall {
    name: string;
    places: any[][];
}

export interface Seance {
    time: string;
    hall: Hall;
}

export interface Schedule {
    date: string;
    seances: Seance[];
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
