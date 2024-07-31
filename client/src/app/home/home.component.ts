import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Products } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private productsService: ProductsService){

  }

  ngOnInit(): void {
    this.productsService.getProducts('http://localhost:3000/clothes',{page:0,perPage:5}).
    subscribe((products:Products) => {
      console.log(products.items)
    })
  }
}
