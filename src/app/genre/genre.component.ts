import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  constructor(
    /**
     * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
     * The data can be accessed to populate the view.
     * @param data incluidng name and description
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
