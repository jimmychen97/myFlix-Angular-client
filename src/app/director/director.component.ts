import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  /**
   * Injects data from MovieCardComponent into DirectorComponent using the MAT_DIALOG_DATA injection token.
   * @param data including name, bio and birthday
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: Date;
    }
  ) {}

  ngOnInit(): void {}
}
