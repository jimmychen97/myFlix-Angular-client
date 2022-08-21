import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Gets all the movies using API service and populate local state variable
   * @returns array of movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens the genre dialog from GenreComponent
   * @params name, description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * Opens the genre dialog from DirectorComponent
   * @params name, bio
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * Opens the genre dialog from SynopsisComponent
   * @params title, description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * Gets the list of user's favorite movies
   * @function getFavoriteMovies
   * @returns user's favorite movie list
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      return this.favoriteMovies;
    });
  }

  /**
   * Checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true if the movie is in the array
   * @function isFav
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * Add a movie to the list of favorite movies using API service
   * @param id
   * @function addToFavoriteMovies
   */
  addToFavoriteMovies(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.ngOnInit();

      this.snackBar.open('Movie added to your favorite list', 'OK', {
        duration: 2000,
      });
    });
  }
}
