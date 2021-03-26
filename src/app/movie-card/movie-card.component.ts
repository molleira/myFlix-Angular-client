// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GetAllMovies } from '../fetch-api-data.service';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMovies,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

}
