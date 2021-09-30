import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movies: any[] = [];

  
  constructor(private _movieService: MovieService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getMovies()
  }

getMovies(){
  this._movieService.getMovies().subscribe(data => {
    this.movies = [];
    data.forEach((element: any) => {
      //console.log(element.payload.doc.id);
      //console.log(element.payload.doc.data());
      this.movies.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      });
    });
    console.log(this.movies);
  });
}

deleteMovie(id: string) {
  this._movieService.deleteMovie(id).then(() => {
    console.log('empleado eliminado con exito');
    this.toastr.error('la pelicula fue eliminada con exito', 'Registro eliminado!', {
      positionClass: 'toast-bottom-right'
    });
  }).catch(error => {
    console.log(error);
  })
}

}
