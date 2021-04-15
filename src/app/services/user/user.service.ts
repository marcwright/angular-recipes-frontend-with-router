import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(newUser): void {
    // const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    console.log(newUser);
    this.http
      .post(`${herokuUrl}/auth/users/register`, newUser)
      .toPromise()
      .then(response => console.log(response));
  }
}
