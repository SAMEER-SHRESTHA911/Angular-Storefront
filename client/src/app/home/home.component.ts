import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { EditPopupComponent } from "../components/edit-popup/edit-popup.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  
  constructor(private productsService: ProductsService){}
  
  ngOnInit(): void {
    this.fetchProducts(0,this.rows)
  }

  displayAddPopup : boolean = false;
  displayEditPopup : boolean = false;
  
  rows: number = 5;
  products:Product[] = [];
  totalRecords : number = 0;

  selectedProduct:Product = {
    id:0,
    name:'',
    image:'',
    price:'',
    rating:0
  } 

  toggleEditPopup(product:Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  onConfirmAdd(product:Product){
    this.addProduct(product);
    this.displayAddPopup = true;  
  }

  onConfirmEdit(product:Product){
    if(!this.selectedProduct.id){
      return
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = true;
  }

  onProductOutput(product: Product){
    console.log(product,'Output')
  }

  onPageChange(event:any){
    this.fetchProducts(event.page, event.rows)
  }

  fetchProducts(page:number,perPage:number){
    this.productsService.getProducts('http://localhost:3000/clothes',{page,perPage}).
    subscribe((products:Products) => {
      console.log(products.items);
      this.products = products.items;
      this.totalRecords = products.total;
      console.log(this.products)
    })
  }

  editProduct(product:Product, id:number){
    this.productsService.editProducts(`http://localhost:3000/clothes/${id}`, product)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0,this.rows);
      },
      error: (error) => {
        console.log(error)
      } 
    })
  }

  deleteProduct(id:number){
    this.productsService.deleteProducts(`http:localhost:3000/clothes/${id}`)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0,this.rows);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  addProduct(product:Product){
    this.productsService.addProducts(`http://localhost:3000/clothes`, product)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.fetchProducts(0,this.rows);
      },
      error:(error) => {
        console.log(error)
      }
  })
  }

}
