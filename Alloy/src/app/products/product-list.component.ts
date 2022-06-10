import { createAttribute } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin:number = 50;
    showImage: boolean = false;
    filteredProducts: IProduct[] = [];
    private _listFilter: string = " ";
    errorMessage: string='';
    sub!: Subscription;
    
    get listFilter(): string{
      return this._listFilter;
    }

    set listFilter(v: string){
      this._listFilter=v;
      console.log('In setter:', v);
      this.filteredProducts = this.performFilter(v);
    }

    constructor(private productservice: ProductService){

    }

    products: IProduct[] = [];

    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().includes(filterBy)
      );
    }

    toggleImage(): void{
        this.showImage= !this.showImage;
    }

    ngOnInit(): void{
      this.productservice.getProducts().subscribe({
        next: products => {
          this.products = products; 
          this.filteredProducts = this.products; 
        },
        error: err => this.errorMessage=err
      });
       
      console.log("In Oninit");
    }
    ngOnDestroy(){
      this.sub.unsubscribe();
    }
    onRatingClicked(message: string): void{
      this.pageTitle = 'Product List: ' + message;
    }
}

