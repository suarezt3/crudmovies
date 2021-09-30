import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMoviesComponent } from './components/create-movies/create-movies.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-movies', pathMatch: 'full'},
  { path: 'list-movies', component: ListMoviesComponent },
  { path: 'create-movie', component: CreateMoviesComponent },
  { path: 'edit-movies/:id', component: CreateMoviesComponent },
  { path: '**', redirectTo: 'list-movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
