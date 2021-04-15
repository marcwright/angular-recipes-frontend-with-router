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

  getCategories(): void {
    console.log('get Categories');
    this.categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
