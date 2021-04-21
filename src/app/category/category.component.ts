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
  recipeName:string;
  recipeTime: string;
  recipePortions:number;
  recipeIngredients:string;
  recipeSteps:string;
  recipeIsPublic:boolean;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  createRecipe(): any {
    console.log('component: ', this.category, this.recipeName);
    const newRecipe = {
      name: this.recipeName,
      time: this.recipeTime,
      portions: this.recipePortions,
      ingredients: this.recipeIngredients,
      steps: this.recipeSteps,
      isPublic: this.recipeIsPublic
    };
    this.recipeName = '';
    this.categoryService.createRecipe(this.category, newRecipe).subscribe(response => {
      this.category.recipeList = [...this.category.recipeList, response];

      console.log(response);
    });
  }
  deleteRecipe(recipe): any {
    const index = this.category.recipeList.indexOf(recipe);
    console.log(index);
    this.categoryService.deleteRecipe(this.category, recipe.id).subscribe(response => {
      this.category.recipeList.splice(index, 1);
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
