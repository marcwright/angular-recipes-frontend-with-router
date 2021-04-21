import { CategoryService } from 'src/app/services/category/category.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: any [];
  public categoryName: string;
  public categoryDescription: string;

  constructor(private categoryService: CategoryService) { }

  getCategories(): any {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  createCategory(): any {
    const newCategory = {
      name: this.categoryName,
      description: this.categoryDescription
    };
    this.categoryService.createCategory(newCategory).subscribe(response => {
      this.categories = [...this.categories, response];
    });
  }

  deleteCategory(category): any {
    const index = this.categories.indexOf(category);
    console.log(index);
    this.categoryService.deleteCategory(category).subscribe(response => {
      this.categories.splice(index, 1);
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
