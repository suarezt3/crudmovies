import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: AngularFirestore) { }

  agregarMovie(movie: any): Promise<any> {
    return this.firestore.collection('movies').add(movie);
  }

getMovies(): Observable<any> {
  return this.firestore.collection('movies', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
}


deleteMovie(id: string): Promise<any> {
  return this.firestore.collection('movies').doc(id).delete();
}

getMovie(id: string): Observable<any> {
  return this.firestore.collection('movies').doc(id).snapshotChanges();
}

updateMovie(id: string, data:any): Promise<any> {
  return this.firestore.collection('movies').doc(id).update(data);
}

}
