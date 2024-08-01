import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule, ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private productsService: ProductsService){

  }

  products:Product[] = [];

  ngOnInit(): void {
    this.productsService.getProducts('http://localhost:3000/clothes',{page:0,perPage:5}).
    subscribe((products:Products) => {
      console.log(products.items);
      this.products = products.items;
      console.log(this.products)
    })
  }
}
