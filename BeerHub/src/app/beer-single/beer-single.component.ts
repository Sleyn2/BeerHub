import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PunkAPIService } from '../shared/services/PunkAPI.service';
import { BeerSingleModel } from '../shared/models/beerSingle.model';

@Component({
  selector: 'app-beer-single',
  templateUrl: './beer-single.component.html',
  styleUrls: ['./beer-single.component.scss']
})
export class BeerSingleComponent {

id: any
public beer: BeerSingleModel

constructor(private route: ActivatedRoute, private _punkApiService : PunkAPIService) {
  this.route.paramMap.subscribe(paramMap => {
    this.id = paramMap.get('beerId')
})
}

async ngOnInit() {
   await this.query()
}


  query() {
    this._punkApiService.getBeer(this.id).subscribe((data) => {
      this.beer = data[0];
      console.log(this.beer)
    })
}

}
