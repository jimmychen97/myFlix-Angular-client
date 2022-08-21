import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * calls API end-piont to get the user's data
   * @function getUser
   * @returns user's data in json format
   */
  getUser(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favMovies.push(movie);
              this.displayElement = true;
            }
          });
        });
      });
    }
  }

  /**
   * opens the UserEditComponent for a user to change their personal data
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  /**
   * opens the dialog to display the SynopsisComponent
   * @param title {string}
   * @param imagePath {any}
   * @param description {string}
   */
  openSynopsisDialog(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom',
    });
  }

  /**
   * opens the dialog to display the DirectorComponent
   * @param title {string}
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirectorDialog(
    title: string,
    name: string,
    bio: string,
    birth: string
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Title: title,
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom',
    });
  }

  /**
   * opens the dialog to display the GenreComponent
   * @param title {string}
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(title: string, name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Title: title,
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom',
    });
    console.log('Name: ' + name);
  }

  /**
   * use API end-point to remove a movie from user's favorites
   * @function removeFavoriteMovies
   * @param MovieID {string}
   * @param Title {string}
   * @returns updated user's data in json format
   */
  removeFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(
        `Successfully removed ${Title} from favorite movies.`,
        'OK',
        {
          duration: 4000,
          verticalPosition: 'top',
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    });
  }

  /**
   * calls API end-point to remove a current logged in user from database
   * @function deleteProfile
   * @returns status for user has been removed
   */
  deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannnot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
