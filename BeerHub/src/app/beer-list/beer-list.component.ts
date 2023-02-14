import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BeerModel } from '../shared/models/beer.model';
import { PunkAPIService } from '../shared/services/PunkAPI.service';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'abv', 'ibu', 'ebc', 'srm', 'ph', 'first_brewed'];
  dataSource = new MatTableDataSource<BeerModel>();
  inputChange = new FormControl();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _punkApiService: PunkAPIService) {
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this._punkApiService.query().subscribe(data => {
      this.dataSource = new MatTableDataSource<BeerModel>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  public filter = () => {
    this.dataSource.filter = this.inputChange.value.trim().toLocaleLowerCase();
  }
}