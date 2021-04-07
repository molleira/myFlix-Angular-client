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
    /**
    * Call functions on page load to retrieve all movies from database
    * and a list of user's favorite movies
    */
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
  * Function that retrieves list of all movies from database
  * @returns movies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * Function to open dialog showing movie details
  * @param Description type: string - Movie description
  * @param Image type: string - Path to movie image
  * @param Title type: string - Movie title
  */
  openDetailsDialog(Description: string, Image: string, Title: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { Description, Image, Title },
      width: '400px',
      height: '400px',
    });
  }

  /**
  * Function to open dialog showing genre details
  * @param Name type: string - Name of genre
  * @param Description type: string - Description of genre
  */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  /**
  * Function to open dialog showing director details
  * @param Name type: string - Name of director
  * @param Bio type: string - Director bio
  * @param Birth type: string - Year director was born
  */
  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth },
      width: '400px',
      height: '400px',
    });
  }

  /**
   * Function to get user's favorite movies
   * @returns favoriteMovieIDs - IDs of user's favorite movies
   */
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

  /**
   * Function that adds movie to user's list of favorites
   * @param id type: number - Movie ID
   * @param Title type: string - Movie Title
   */
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

  /**
   * Function to delete a movie from user's list of favorites
   * @param id type: string - ID of movie to be deleted from favorites
   * @param Title type: string - Title of movie to be deleted from favorites
   */
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
