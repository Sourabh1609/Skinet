import { IProductType } from './../shared/models/ProductTypes';
import { IBrands } from './../shared/models/Brands';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  //access the template reference variable inside the child 
  @ViewChild('search',{static:true}) searchTerm:ElementRef;
  products: IProduct[];
  brands: IBrands[];
  types: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price : Low to High', value: 'priceAsc' },
    { name: 'Price : High to Low', value: 'priceDesc' },
  ];

  constructor(private shopservice: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopservice.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (errors) => {
        console.log(errors);
      }
    );
  }
  getBrands() {
    this.shopservice.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (errors) => {
        console.log(errors);
      }
    );
  }
  getTypes() {
    this.shopservice.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (errors) => {
        console.log(errors);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    
    this.getProducts();
  }
  onPageChanged(event: any) {
    if(this.shopParams.pageNumber != event)
    {
      this.shopParams.pageNumber = event;
    }
    
    this.getProducts();
  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
    this.searchTerm.nativeElement.value = '';
  }
  onReset(){
    this.searchTerm.nativeElement.value = 'Search For Products..';
    this.shopParams = new ShopParams(); 
    this.getProducts();
  }
}
