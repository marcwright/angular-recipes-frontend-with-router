import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): void {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.http
      .get(`${herokuUrl}/api/categories`, requestOptions)
      .toPromise()
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => console.log(error));
  }


}
