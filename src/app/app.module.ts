import { BrowserModule } from '@angular/platform-browser';
import {EventEmitter, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { ProdustComponent } from './produst/produst.component';
import { StarsComponent } from './stars/stars.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductService} from "./share/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductPipe } from './filter/product.pipe';
import {HttpModule} from "@angular/http";

const routerConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productDetail/:productId', component: ProductDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    SearchComponent,
    ProdustComponent,
    StarsComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
