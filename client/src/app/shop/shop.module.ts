import { ShopRoutingModule } from './shop-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemsComponent } from './product-items/product-items.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [ShopComponent, ProductItemsComponent, ProductDetailsComponent],
  imports: [
  CommonModule,
  SharedModule,
  ShopRoutingModule
  ],
})
export class ShopModule {}
