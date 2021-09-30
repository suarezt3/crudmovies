import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieService, } from 'src/app/services/movies.service';

@Component({
  selector: 'app-create-movies',
  templateUrl: './create-movies.component.html',
  styleUrls: ['./create-movies.component.css']
})
export class CreateMoviesComponent implements OnInit {

  createMovie: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  text = 'Agregar pelicula';


  constructor(private fb: FormBuilder, private _movieService: MovieService, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) { 
    this.createMovie = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', Validators.required],
      language: ['', Validators.required],
      estreno: ['', Validators.required],
      pais: ['', Validators.required]
    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esedit();
  }

  agregarMovie(){
    //console.log(this.createMovie);
    this.submitted = true;

    if(this.createMovie.invalid){
      return;
    }
 

    if(this.id === null) {
      this.add();
    }else{
      this.editMovie(this.id);
    }

  }

  add() {
    const movie: any = {
      id: this.createMovie.value.id,
      titulo: this.createMovie.value.titulo,
      fecha: this.createMovie.value.fecha,
      duracion: this.createMovie.value.duracion,
      language: this.createMovie.value.language,
      estreno: this.createMovie.value.estreno,
      pais: this.createMovie.value.pais,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
      
    }
    this.loading = true;


    this._movieService.agregarMovie(movie).then(() =>{
      this.toastr.success('Pelicula registrada exitosamente', 'Registro exitoso', {positionClass: 'toast-bottom-right'});
      this.loading = false;
      this.router.navigate(['/list-movies']);
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })
  }


  editMovie(id: string) {
    const movie: any = {
      id: this.createMovie.value.id,
      titulo: this.createMovie.value.titulo,
      fecha: this.createMovie.value.fecha,
      duracion: this.createMovie.value.duracion,
      language: this.createMovie.value.language,
      estreno: this.createMovie.value.estreno,
      pais: this.createMovie.value.pais,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._movieService.updateMovie(id, movie).then(() =>{
      this.loading = false;
      this.toastr.info('La pelicula fue modificada con exito', 'Pelicula modificada', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-movies']);
    })

  }

  esedit() {
    this.text = 'Editar pelicula'
    if(this.id !== null) {
      this.loading = true;
      this._movieService.getMovie(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['titulo']);
        this.createMovie.setValue({
          id: data.payload.data()['id'],
          titulo: data.payload.data()['titulo'],
          fecha: data.payload.data()['fecha'],
          duracion: data.payload.data()['duracion'],
          language: data.payload.data()['language'],
          estreno: data.payload.data()['estreno'],
          pais: data.payload.data()['pais'],
        })
      })
    }
  }

}
