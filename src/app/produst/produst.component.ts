import {Component, EventEmitter, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product, ProductService} from "../share/product.service";
import 'rxjs/Rx';


@Component({
  selector: 'app-produst',
  templateUrl: './produst.component.html',
  styleUrls: ['./produst.component.css']
})
export class ProdustComponent implements OnInit {
  public Products: Observable<Product[]>;
  private imgUrl: string = 'http://placehold.it/320x200';
  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    // 这边只执行一次
    this.Products = this.productService.getProduct();
    // 订阅事件流,控制搜索出来的商品
    this.productService.searchEvent.subscribe(
      params => this.Products = this.productService.search(params)
    )
  }
}



