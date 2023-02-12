import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BeerModel } from "../models/beer.model";

@Injectable()
  export class PunkAPIService {
    constructor(private _http: HttpClient) { }
    private readonly _appUrl = 'http://localhost:8100/api';

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    query(options?: any): Observable<BeerModel[]> {
        let reqOptions = {...this.httpOptions};
        return this._http.get<BeerModel[]>(this._appUrl + '/beer-list-all', reqOptions);
    }

    getBeer(id: number): Observable<BeerModel> {
      return this._http.get<BeerModel>(this._appUrl + '/beer/' + id);
    }

    getRandomBeer(id: number): Observable<BeerModel> {
      return this._http.get<BeerModel>(this._appUrl + '/beer/random');
    }
  }