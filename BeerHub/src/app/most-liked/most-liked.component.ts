import { Component } from '@angular/core';
import { BeerFavouriteModel } from '../shared/models/beer-favourite.model';

@Component({
  selector: 'app-most-liked',
  templateUrl: './most-liked.component.html',
  styleUrls: ['./most-liked.component.scss']
})
export class MostLikedComponent {
  public beers: BeerFavouriteModel[];
}
