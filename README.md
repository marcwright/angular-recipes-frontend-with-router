## Angular Recipes Frontend

1. `ng new angular-recipes-frontend`

## Create a Category Service

1. `mkdir src/app/services`
2. `mkdir src/app/services/category`
3. `cd src/app/services/category`
4. `ng g s category`


## Generate Components and Router

1. `ng g c register`
2. `ng g c categories`
3. `ng g c login`
4. `ng g c home`

`app-routing.module.ts`

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```


`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignupComponent } from './signup/signup.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

`app.component.html`

```html
<div class="container">
  <header>
    <a routerLink="/">Recipe App</a>
    <nav>
      <a routerLink="/signup">SIGN UP</a>
      <a routerLink="/categories">CATEGORIES</a>
      <a routerLink="/login">LOG IN</a>
    </nav>
  </header>

  <div>
    <router-outlet></router-outlet>
  </div>
</div>
```

`app.component.css`

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  font-family: Arial;
}
header {
  background-color: lightgrey;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  padding: 0px 100px;
  height: 50px;
}
nav {
  width: 500px;
  display: flex;
  justify-content: space-between;
}

```

<br>

## Register User

1. `mkdir src/app/services/user`
2. `cd src/app/services/user`
3. `ng g s user`

`signup.component.html`

```html
<form>
  <h2>Register a User</h2>
  <input [(ngModel)]="userName" type="text" name="userName" placeholder="User Name"/>
  <input [(ngModel)]="emailAddress" type="text" name="emailAddress" placeholder="Email Address"/>
  <input [(ngModel)]="password" type="text" name="password" placeholder="Password"/>
  <input (click)="registerUser()" type="submit" value="Register"/>
</form>
```

`signup.component.ts`

```js
import {UserService} from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public userName: string;
  public emailAddress: string;
  public password: string;


  registerUser(): void {
    const newUser = {userName: this.userName, emailAddress: this.emailAddress, password: this.password};
    this.userService.registerUser(newUser);
  }
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

  }

}
```


`user.service.ts`

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { console.log('user service loaded'); }

  registerUser(newUser): void {
    console.log(newUser);
    this.http
      .post(`${herokuUrl}/auth/users/register`, newUser)
      .toPromise()
      .then(response => console.log(response));
  }
}
```

<br>

## LogIn User

`login.component.ts`

```js
import {UserService} from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private userService: UserService) { }

  loginUser(): void {
    const user = {email: this.email, password: this.password};
    console.log(user);
    this.userService.loginUser(user);
  }

  ngOnInit(): void {
  }

}
```

`login.component.html`

```html
<form>
  <h2>Login a User</h2>
  <input [(ngModel)]="email" type="text" name="email" placeholder="User Name"/>
  <input [(ngModel)]="password" type="text" name="password" placeholder="Password"/>
  <input (click)="loginUser()" type="submit" value="Log In"/>
</form>
```

`user.service.ts`

```js

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
      })
      .catch(error => console.log(error));
  }
```

<br>

## Heroku Deployment

[Heroku Angular Reference](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147)
[Mike Dang Heroku Lesson](https://git.generalassemb.ly/dang/angular-heroku)

1. `heroku create NAME_OF_APP`


1. `package.json`

	```js
	 "scripts": {
	    "ng": "ng",
	    "start": "node server.js",
	    "build": "ng build",
	    "test": "ng test",
	    "lint": "ng lint",
	    "e2e": "ng e2e",
	    "heroku-postbuild": "ng build --prod"
	  },
	 ```

1. In the root of your project: `touch server.js`. Replace the path with the name of your project folder.

```js
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
// Replace angular-recipes-frontend with your project name
app.use(express.static(__dirname + '/dist/angular-recipes-frontend'));

app.get('/*', function(req,res) {

  // Replace angular-recipes-frontend with your project name
  res.sendFile(path.join(__dirname+'/dist/angular-recipes-frontend/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
```

1. In the root of your project: `touch Procfile`.

```
web: npm start
```