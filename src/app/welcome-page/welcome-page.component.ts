// src/app/welcome-page/welcome-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
    });
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
    });
  }

}
