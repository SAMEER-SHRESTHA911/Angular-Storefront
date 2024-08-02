import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    PaginatorModule,
    ButtonModule
  ],
  providers: [  ConfirmationService ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!:Product;
  @Output() edit : EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete : EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private confirmationService: ConfirmationService
  ){}

  editProduct(){
    this.edit.emit(this.product)
  }

  confirmDelete(){
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this product",
      accept: ()=> {
        this.deleteProduct();
      },
    })
  }

  deleteProduct(){
    this.delete.emit(this.product)
  }

  // ngOnInit(): void {
  //   console.log(this.product.image)
  // }

  // get imageUrl(){
  //   return this.product.image
  // }
}
