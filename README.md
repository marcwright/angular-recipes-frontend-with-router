## Angular Recipes Frontend

- [Angular Recipes Heroku Frontend](https://angular-recipes-with-router.herokuapp.com/)
- [Spring Boot Recipes Backend](https://damp-bayou-38809.herokuapp.com)
- [SpringBoot Backend API Endpoints](https://git.generalassemb.ly/sureshmelvinsigera/endpoints/blob/master/README.md)

1. `ng new angular-recipes-frontend` 

	- Go ahead and let the cli add routing for you
	- If you get a Jasmine `The Schematic workflow failed. See above.` error then [try this Stack Overflow issue](https://stackoverflow.com/questions/67463513/angular-the-schematic-workflow-failed-see-above)

<br>

## Generate Components and Router

```bash
ng g c signup
ng g c categories
ng g c login
ng g c home
```

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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {SignupComponent} from "./signup/signup.component";
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`app.component.html`

```html
<nav>
  <div class="nav-wrapper">
    <a class="brand-logo" routerLink="/login">Recipe App</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a routerLink="/categories">All Categories</a></li>

      <span *ngIf="">
        <li><a routerLink="/signup">Sign Up</a></li>
        <li><a routerLink="/login">Log In</a></li>
      </span>
      <span *ngIf="">
        <li><a routerLink="/logout">Log Out</a></li>
        <li>Hello,</li>
      </span>
    </ul>
  </div>
</nav>


<div class="container">
  <router-outlet></router-outlet>
</div>
```

`app.component.css`

```css
.container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

<br>

## Add Materialize

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularRecipesFrontend</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- Compiled and minified CSS -->

</head>
<body>

  <app-root></app-root>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>
</html>
```

<br>

## Register User

```bash
mkdir src/app/services/
mkdir src/app/services/user
cd src/app/services/user
ng g s user
```

1. `signup.component.html`

	```html
	<form>
	  <h2>Register a User</h2>
	  <input [(ngModel)]="userName" type="text" name="userName" placeholder="User Name"/>
	  <input [(ngModel)]="emailAddress" type="text" name="emailAddress" placeholder="Email Address"/>
	  <input [(ngModel)]="password" type="text" name="password" placeholder="Password"/>
	  <input (click)="registerUser()" type="submit" value="Register"/>
	</form>
	```

1. `signup.component.ts`

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

1. `user.service.ts`

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
	      .subscribe(response => console.log(response),serr => console.log(err));
	  }
	}
	```

<br>

## LogIn User

1. `login.component.ts`

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

1. `login.component.html`

	```html
	<form>
	  <h2>Login a User</h2>
	  <input [(ngModel)]="email" type="text" name="email" placeholder="User Name"/>
	  <input [(ngModel)]="password" type="text" name="password" placeholder="Password"/>
	  <input (click)="loginUser()" type="submit" value="Log In"/>
	</form>
	```

1. `user.service.ts`
	
	```js
	  loginUser(user): void {
	    console.log(user);
	    this.http
	      .post(`${herokuUrl}/auth/users/login`, user)
	      .subscribe(response => {
	        const token = response['jwt'];
	        localStorage.setItem('currentUser', `${user.email}`);
	        localStorage.setItem('token', `${token}`);
	        console.log(response, token);
	      }, err => console.log(err));
	  }
	```
	
	![](https://i.imgur.com/d37bggf.png)

<br>

## Logout User

1. `ng g c logout`

1. `logout.component.ts`

	```js
	import { Component, OnInit } from '@angular/core';
	import { UserService } from 'src/app/services/user/user.service';
	
	@Component({
	  selector: 'app-logout',
	  templateUrl: './logout.component.html',
	  styleUrls: ['./logout.component.css']
	})
	export class LogoutComponent implements OnInit {
	
	  constructor(private userService: UserService) { }
	
	  ngOnInit(): void {
	    this.userService.logoutUser();
	  }
	}
	```

1. `app-routing.module.ts`

	```js
	
		...
		
			import { LogoutComponent} from './logout/logout.component';
			
		...
		
			{
	    		path: 'logout',
	    		component: LogoutComponent
	  		}
			
	```

1. `app.component.html`

	```html
		<a routerLink="/logout">LOG OUT</a>
	```
	
1. `user.service.ts`
	
	```js
	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { Router } from '@angular/router'; // ADD THIS
	import { Subject } from 'rxjs'; // ADD THIS
	
	const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';
	
	@Injectable({
	  providedIn: 'root'
	})
	export class UserService {
	  currentUser: string;  // ADD THIS
	  searchSubject = new Subject();  // ADD THIS
	
		// INJECT ROUTER
	  constructor(private http: HttpClient, private router: Router) { console.log('user service loaded'); }
	
	  registerUser(newUser): void {
	    console.log(newUser);
	    this.http
	      .post(`${herokuUrl}/auth/users/register`, newUser)
	      .subscribe(response => console.log(response));
	  }
	
	  loginUser(user): void {
	    console.log(user);
	    this.http
	      .post(`${herokuUrl}/auth/users/login`, user)
	      .subscribe(response => {
	        const token = response['jwt'];
	        localStorage.setItem('currentUser', `${user.email}`);
	        localStorage.setItem('token', `${token}`);
	        console.log(response, token);
	      }, err => console.log(err));
	  }
	
    	// ADD THIS
	  logoutUser(): void {
	    localStorage.removeItem('currentUser');
	    localStorage.removeItem('token');
	    this.currentUser = '';
	    this.router.navigate(['/login']);
	  }
	}
	```

1. Navigate to `http://localhost:4200/logout` and check `localStorage` in your console.

<br>

## Conditional NavBar

1. `app.component.html`

	```html
	<nav>
	  <div class="nav-wrapper">
	    <a class="brand-logo" routerLink="/login">Recipe App</a>
	    <ul id="nav-mobile" class="right hide-on-med-and-down">
	      <li><a routerLink="/categories">All Categories</a></li>
	
	      <span *ngIf="!this.currentUser">
	        <li><a routerLink="/signup">Sign Up</a></li>
	        <li><a routerLink="/login">Log In</a></li>
	      </span>
	      <span *ngIf="this.currentUser">
	        <li><a routerLink="/logout">LOG OUT</a></li>
	        <li>Hello,</li>
	      </span>
	    </ul>
	  </div>
	</nav>
	
	
	<div class="container">
	  <router-outlet></router-outlet>
	</div>
	```

1. `user.service.ts`

	```js
	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { Router } from '@angular/router';
	import { Subject } from 'rxjs';
	
	const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';
	
	@Injectable({
	  providedIn: 'root'
	})
	export class UserService {
	  currentUser: string;
	  searchSubject = new Subject();
	
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
	      .subscribe(response => {
	        const token = response['jwt'];
	        localStorage.setItem('currentUser', `${user.email}`);
	        localStorage.setItem('token', `${token}`);
	        console.log(response, token);
	        this.currentUser = user.email;
	        this.searchSubject.next(this.currentUser);
	        this.router.navigate(['/categories']);
	      }, err => console.log(err));
	  }
	
	  logoutUser(): void {
	    localStorage.removeItem('currentUser');
	    localStorage.removeItem('token');
	    this.currentUser = null;
	    this.searchSubject.next(this.currentUser);
	    this.router.navigate(['/login']);
	  }
	}
	```

1. `app.component.ts`

	```js
	import { Component, OnInit } from '@angular/core';
	import { UserService } from 'src/app/services/user/user.service';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  currentUser: any;
	
	  constructor(private userService: UserService) { }
	
	  // tslint:disable-next-line:use-lifecycle-interface
	  ngOnInit(): void {
	    this.userService.searchSubject.subscribe(currentUser => {
	      this.currentUser = currentUser;
	      console.log(currentUser);
	    });
	  }
	}
	```

<br>


## Create a Category Service

```bash
mkdir src/app/services/category
cd src/app/services/category
ng g s category
```

<br>

## GET Categories for logged in user

1. `category.service.ts`

	```js
	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { HttpHeaders } from '@angular/common/http';
	
	const herokuUrl = 'https://damp-bayou-38809.herokuapp.com';
	
	
	@Injectable({
	  providedIn: 'root'
	})
	export class CategoryService {
	
	  constructor(private http: HttpClient) { }
	
	  getCategories(): any {
	    const token = localStorage.getItem('token');
	    const requestOptions = {
	      headers: new HttpHeaders({
	        Authorization: `Bearer ${token}`
	      }),
	    };
	    return this.http
	      .get(`${herokuUrl}/api/categories`, requestOptions);
	  }
	}
	```

1. `categories.component.ts`

	```js
	import { CategoryService } from 'src/app/services/category/category.service';
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-categories',
	  templateUrl: './categories.component.html',
	  styleUrls: ['./categories.component.css']
	})
	export class CategoriesComponent implements OnInit {
	  public categories: [];
	
	  constructor(private categoryService: CategoryService) { }
	
	  getCategories(): any {
	    this.categoryService.getCategories().subscribe(response => {
	      this.categories = response;
	    });
	  }
	
	  ngOnInit(): void {
	  }
	
	}
	```

1. `categories.component.html`
	
	```html
	<section>
	<!--  <h2>Get All Categories for {{this.emailAddress}}</h2>-->
	  <button (click)="getCategories()">Get All Categories</button>
	</section>
	
	<div *ngIf="categories">
	  <h4>All Categories</h4>
	  <ul>
	    <li *ngFor="let category of categories">
	      {{category.name}} -- {{category.description}}
	      <button (click)="deleteCategory(category)">delete</button>
	      <form (submit)="createRecipe(category)">
	        <input [(ngModel)]="recipeName" name="recipeName" type="text" placeholder="new recipe" />
	        <input type="submit"/>
	      </form>
	    </li>
	  </ul>
	</div>
	```

<br>

## POST New Category

1. `categories.component.html`

	```html
	<h4>Create New Category</h4>
	<form (submit)="createCategory()">
	  <input [(ngModel)]="categoryName" name="categoryName" type="text" placeholder="name" />
	  <input [(ngModel)]="categoryDescription" name="categoryDescription" type="text" placeholder="description" />
	  <input type="submit"/>
	</form>
	```



1. `categories.component.ts`

	```js
	...
		
		public categories: any [];
		
	...
	
		  createCategory(): any {
		    const newCategory = {
		      name: this.categoryName,
		      description: this.categoryDescription
		    };
		    this.categoryService.createCategory(newCategory).subscribe(response => {
		      this.categories = [...this.categories, response];
		    });
		  }
	
	```
	
1. `category.service.ts`

	```js
	
	...
		
	  createCategory(newCategory): any {
	    console.log(newCategory);
	    const token = localStorage.getItem('token');
	    const requestOptions = {
	      headers: new HttpHeaders({
	        Authorization: `Bearer ${token}`
	      }),
	    };
	    return this.http
	      .post(`${herokuUrl}/api/categories/`, newCategory, requestOptions);
	  }	
	```

<br>

## POST new Recipe for a Category

`category.service.ts`

```js
  createRecipe(category, newRecipe): any {
    console.log('service: ', category, newRecipe);
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    return this.http
      .post(`${herokuUrl}/api/categories/${category.id}/recipes`, newRecipe, requestOptions);
  }
```

`categories.component.ts`

```js
  createRecipe(category): any {
    console.log('component: ', category, this.recipeName);
    const newRecipe = {name: this.recipeName};
    this.categoryService.createRecipe(category, newRecipe).subscribe(response => {
      console.log(response);
    });
  }
```
<br>

## Render Recipes for a Category

`categories.component.html`

```html
<section>
  <button (click)="getCategories()">Get All Categories</button>
</section>

<div *ngIf="categories">
  <h4>All Categories</h4>
  <ul>
    <li *ngFor="let category of categories">
      {{category.name}} -- {{category.description}}
      <button (click)="deleteCategory(category)">delete</button>
      <ul>
        <li *ngFor="let recipe of category.recipeList">
        {{recipe.name}}
      </ul>
      <form (submit)="createRecipe(category)">
        <input [(ngModel)]="recipeName" name="recipeName" type="text" placeholder="new recipe" />
        <input type="submit"/>
      </form>
    </li>
  </ul>
</div>
```
<br>

## Single Category Component

1. `ng g c category`
1. Create a route for a single Category.


	`app-routing.module.ts`

	```js
	
		...
		
			import { CategoryComponent } from './category/category.component';
	
		...
		
		 	{
		     path: 'categories/:id',
		     component: CategoryComponent
  		  	},
	
	```

1. Move the `createRecipe()` logic from `CategoriesComponent` to `CategoryComponent`.

	`category.component.ts`

	```js
	import { CategoryService } from 'src/app/services/category/category.service';
	import { Component, OnInit } from '@angular/core';
	import { ActivatedRoute } from '@angular/router';
	
	@Component({
	  selector: 'app-category',
	  templateUrl: './category.component.html',
	  styleUrls: ['./category.component.css']
	})
	export class CategoryComponent implements OnInit {
	  categoryId: string;
	  category: any;
	  recipeName = '';
	
	  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }
	
	  createRecipe(): any {
	    console.log('component: ', this.category, this.recipeName);
	    const newRecipe = {name: this.recipeName};
	    this.categoryService.createRecipe(this.category, newRecipe).subscribe(response => {
	      console.log(response);
	    });
	  }
	
	  ngOnInit(): void {
	    this.route.paramMap
	      .subscribe( params => {
	        this.categoryId = params.get('id');
	        this.categoryService.getCategory(this.categoryId).subscribe(response => {
	          this.category = response;
	          console.log(this.category);
	        });
	      });
	  }
	
	}
	```
	
1. `category.component.html`

	```js
	
	<div *ngIf="category">
	  <h4>{{category.name}}</h4>
	  <p>{{category.description}}</p>
	  <form (submit)="createRecipe()">
	    <input [(ngModel)]="recipeName" name="recipeName" type="text" placeholder="new recipe" />
	    <input type="submit"/>
	  </form>
	  <ul>
	    <li *ngFor="let recipe of category.recipeList">
	      {{recipe.name}}
	      <button (click)="deleteRecipe(category)">delete</button>
	    </li>
	  </ul>
	</div>
	```

<br>

## DELETE Recipe


<br>

## DELETE Category

<br>

## Add Materialze and Toast

<br>

## Combine login and sign up components into a user component

<br>

## Heroku Deployment

[Heroku Angular Reference](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147)
[Mike Dang Heroku Lesson](https://git.generalassemb.ly/dang/angular-heroku)

1. `heroku create NAME_OF_APP`


1. Run `node -v` and `npm -v` and copy your versions into `package.json`. 

	```js
	 "engines": {
    	"node": "15.9.0",
   		"npm": "7.7.6"
	  },
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
1. Copy `"typescript": "YOUR_VERSION"` from devDependencies to dependencies to also inform Heroku what typescript version to use.
	 
1. `npm install enhanced-resolve@3.3.0 --save-dev`
1. `npm i express path`

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