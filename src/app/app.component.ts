import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiIMDbTop100Service } from './services/api-imdb-top-100.service';
import { movie } from './interfaces/movie';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { data } from './const/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  //standalone: true,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'nisum-test';
  imbdData: movie[] = [];
  dataSource: MatTableDataSource<movie> = new MatTableDataSource<movie>;
  columnsToDisplay = ['rating', 'title', 'genre', 'year'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: movie | null = null;

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private imbdService: ApiIMDbTop100Service) {
    data.forEach(element => {
      let d = <movie>element;
      this.imbdData.push(d);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.imbdData = this.imbdService.readData();
    //llamar a la api si no hay registros
    if (this.imbdData.length === 0) {
      this.imbdService.getList().subscribe(res => {
        this.imbdService.saveData(res);
        this.imbdData = res;
        this.dataSource.data = this.imbdData;
      });
    } else {
      this.dataSource.data = this.imbdData;
    }
  }

  recargar() {
    this.imbdService.getList();
  }

  delete(item: movie) {
    let index = this.imbdData.findIndex(x => x.imdbid === item.imdbid);
    this.imbdData.splice(index, 1);
    this.dataSource.data = this.imbdData;
  }
  save(data: movie) {
    console.log(data);
    this.imbdData.unshift(data);
    this.dataSource.data = this.imbdData;
  }

}
