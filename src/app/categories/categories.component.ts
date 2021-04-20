import { CategoryService } from 'src/app/services/category/category.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: [];
  public recipeName = '';

  constructor(private categoryService: CategoryService) { }

  getCategories(): any {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  createRecipe(category): any {
    console.log('component: ', category, this.recipeName);
    const newRecipe = {name: this.recipeName};
    this.categoryService.createRecipe(category, newRecipe).subscribe(response => {
      // this.categories = response;
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
