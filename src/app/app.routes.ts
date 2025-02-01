import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailedMovieComponent } from './pages/detailed-movie/detailed-movie.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'movie/:id',
        component: DetailedMovieComponent
    },
    {
        path: '**', 
        redirectTo: '', 
    }
];
