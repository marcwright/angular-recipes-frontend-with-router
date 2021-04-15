import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CategoryService} from '../category/category.service';
import {Router} from '@angular/router';

const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(newUser): any {
    console.log(newUser);
    return this.http
      .post(`${herokuUrl}/auth/users/register`, newUser)
  }

  loginUser(user): void {
    console.log(user);
    this.http
      .post(`${herokuUrl}/auth/users/login`, user)
      .toPromise()
      .then(response => {
        const token = response['jwt'];
        localStorage.setItem('currentUser', `${user.email}`);
        localStorage.setItem('token', `${token}`);
        console.log(response, token);
        this.router.navigate(['/categories']);
      })
      .catch(error => console.log(error));
  }
}
