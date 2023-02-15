import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PunkAPIService } from '../shared/services/PunkAPI.service';
import { BeerSingleModel } from '../shared/models/beerSingle.model';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-beer-single',
  templateUrl: './beer-single.component.html',
  styleUrls: ['./beer-single.component.scss'],
})
export class BeerSingleComponent {
  private id: any;
  public beer: BeerSingleModel;
  private cookieName: string = 'LastBeerSite';
  public user: SocialUser;
  public loggedIn: boolean;
  public isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _punkApiService: PunkAPIService,
    private router: Router,
    private cookieService: CookieService,
    private authService: SocialAuthService
  ) {
    if (this.router.url == '/random-beer') {
      this.id = Math.floor(Math.random() * 325) + 1;
      this.cookieService.set(this.cookieName, this.id.toString());
    } else if (this.router.url == '/last-beer') {
      if (this.cookieService.check(this.cookieName) == false) {
        this.router.navigate(['']);
      } else {
        this.id = this.cookieService.get(this.cookieName);
        this.cookieService.set(this.cookieName, this.id.toString());
      }
    } else {
      this.route.paramMap.subscribe((paramMap) => {
        this.id = paramMap.get('beerId');
        this.cookieService.set(this.cookieName, this.id.toString());
      });
    }
  }

  async ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.user)
        this._punkApiService
          .isFavourite(Number(this.user.id), this.id)
          .subscribe((res) => {
            this.isFavourite = res.isFavourite;
          });
    });
    await this.query();
  }

  addFavourite() {
    console.log(this.user);
  }

  checkBoxChange() {
    if (this.user) {
      this._punkApiService
        .postFavourite(Number(this.user.id), this.id)
        .subscribe((res) => (this.isFavourite = res.isFavourite));
    }
  }

  query() {
    this._punkApiService.getBeer(this.id).subscribe((data) => {
      this.beer = data[0];
      if (!this.beer) {
        this.router.navigate(['']);
      }
    });
  }
}
