import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API } from '../const/const';
import { Observable } from 'rxjs';
import { movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiIMDbTop100Service {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<movie[]> {
    let opt = {
      headers: {
        'X-RapidAPI-Key': API.apikey,
        'X-RapidAPI-Host': API.host
      }
    };
    // y ponele que hacer un suscribe no devuelves nada y guardas en local storage con el metodo de abajo
    return this.httpClient.get<movie[]>(API.url, opt);
  }
  saveData(data: movie[]) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  readData(): movie[] {
    let data: movie[] = JSON.parse(localStorage.getItem('data') || "[]");
    return data;
  }
}
