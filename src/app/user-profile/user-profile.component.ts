import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MovieCardComponent } from '../movie-card/movie-card.component';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
    });
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '400px',
      height: '400px',
    });
  }

  openDirectorDialog(Name: string, Bio: string, BirthYear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, BirthYear },
      width: '400px',
      height: '400px',
    });
  }

}
