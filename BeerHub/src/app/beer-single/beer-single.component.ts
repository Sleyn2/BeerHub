import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PunkAPIService } from '../shared/services/PunkAPI.service';
import { BeerSingleModel } from '../shared/models/beerSingle.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-beer-single',
  templateUrl: './beer-single.component.html',
  styleUrls: ['./beer-single.component.scss']
})
export class BeerSingleComponent {

  private id: any
  public beer: BeerSingleModel
  private cookieName: string = 'LastBeerSite'


  constructor(private route: ActivatedRoute, private _punkApiService: PunkAPIService, private router: Router, private cookieService: CookieService) {
    if (this.router.url == "/random-beer") {
      this.id = Math.floor(Math.random() * 325) + 1;
      this.cookieService.set(this.cookieName, this.id.toString())
    }
    else if (this.router.url == "/last-beer") {
      if (this.cookieService.check(this.cookieName) == false) {
        this.router.navigate([''])
      }
      else {
        this.id = this.cookieService.get(this.cookieName)
        this.cookieService.set(this.cookieName, this.id.toString())
      }
    }
    else {
      this.route.paramMap.subscribe(paramMap => {
        this.id = paramMap.get('beerId')
        this.cookieService.set(this.cookieName, this.id.toString())
      })
    }
  }

  async ngOnInit() {
    await this.query()
  }


  query() {
    this._punkApiService.getBeer(this.id).subscribe((data) => {
      this.beer = data[0];
    })
  }
}
