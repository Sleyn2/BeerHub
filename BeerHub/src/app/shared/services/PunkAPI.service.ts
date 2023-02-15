import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerModel } from '../models/beer.model';
import { BeerSingleModel } from '../models/beerSingle.model';

@Injectable()
export class PunkAPIService {
  constructor(private _http: HttpClient) {}
  private readonly _appUrl = 'http://localhost:8100/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  query(options?: any): Observable<BeerModel[]> {
    let reqOptions = { ...this.httpOptions };
    return this._http.get<BeerModel[]>(
      this._appUrl + '/beer-list-all',
      reqOptions
    );
  }

  getBeer(id: number): Observable<BeerSingleModel[]> {
    return this._http.get<BeerSingleModel[]>(this._appUrl + '/beer/' + id);
  }

  getRandomBeer(id: number): Observable<BeerModel> {
    return this._http.get<BeerModel>(this._appUrl + '/beer/random');
  }

  postFavourite(userId: number, beerId: number): Observable<any> {
    return this._http.post(this._appUrl + '/user/fav/', {
      user_id: userId,
      beer_id: beerId,
    });
  }

  isFavourite(userId: number, beerId: number): Observable<any> {
    return this._http.get(
      this._appUrl + `/user/fav/?user_id=${userId}&beer_id=${beerId}`
    );
  }
}
