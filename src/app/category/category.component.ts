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
