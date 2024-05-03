import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { movie } from '../interfaces/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.sass']
})
export class AddMovieComponent {
  @Output() movie = new EventEmitter<movie>();
  modMovie!: movie;
  constructor() {
  }

  movieForm = new FormGroup({
    rating: new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]),
    title: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required)
  });

  save() {
    if (this.movieForm.valid) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      this.modMovie = {
        description: String(this.movieForm.controls.description.value),
        title: String(this.movieForm.controls.title.value),
        year: Number(this.movieForm.controls.year.value),
        rating: String(this.movieForm.controls.rating.value),
        genre: [String(this.movieForm.controls.genre.value)],
        thumbnail: '',
        imdbid: String(timestamp)
      };
      this.movie.emit(this.modMovie);
    }
  }
}
