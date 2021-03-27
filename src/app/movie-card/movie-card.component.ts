// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// endpoint calls
import {
  GetAllMovies,
  AddFavoriteMovie,
  GetUser,
  DeleteFavoriteMovie,
} from '../fetch-api-data.service';

// components
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMoviesIDs: any[] = [];

  constructor(
    public fetchApiData: GetAllMovies,
    public fetchApiDataFavortie: AddFavoriteMovie,
    public fetchApiDataUser: GetUser,
    public fetchApiDataDeleteFavorite: DeleteFavoriteMovie,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDetailsDialog(Description: string, Image: string, Title: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image, Title },
      width: '400px',
      height: '400px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth },
      width: '400px',
      height: '400px',
    });
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiDataUser.getUser(user).subscribe((resp: any) => {
        this.favoriteMoviesIDs = resp.FavoriteMovies;
        return this.favoriteMoviesIDs;
      });
    }
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  addToFavorites(id: string, Title: string): void {
    this.fetchApiDataFavortie.addFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites.`, 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      console.log(resp);

      this.getFavoriteMovies();
    });

    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  deleteFavoriteMovie(id: string, Title: string): void {
    this.fetchApiDataDeleteFavorite
      .deleteFavoriteMovie(id)
      .subscribe((resp: any) => {
        this.snackBar.open(
          `${Title} has been removed from your favorites.`,
          'OK',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
        console.log(resp);

        this.getFavoriteMovies();
      });
  }

}
