import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct
  //activated route gives us access to the route parameters in the template 
  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute) { }

  ngOnInit()  {
    this.loadProduct();
  }
  loadProduct(){
    // here + will convert the string to id
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product =>{
      this.product = product;
     
      
    },error =>{
      console.log(error);
      
    })
  }

}
