import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    PaginatorModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!:Product;
  @Output() edit : EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete : EventEmitter<Product> = new EventEmitter<Product>();

  editProduct(){
    this.edit.emit(this.product)
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
