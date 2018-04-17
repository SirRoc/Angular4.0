import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../share/product.service";
import {ProdustComponent} from "../produst/produst.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModle: FormGroup;
  categories: string[];
  constructor(private productService: ProductService) {
   let fb = new FormBuilder();
   this.formModle = fb.group({
     title: ['',Validators.minLength(3)],
     price: [null,this.priceValitor],
     categroy: ['-1']
   });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategorys();
  }
  priceValitor(control: FormControl):any {
    if(!control.value) {
      return null;
    }
    let price = parseInt(control.value);
    if(price > 0) {
      return null;
    }else {
      return {priceValid: true}
    }
  }
  onSubmit() {
    if (this.formModle.valid) {
      console.log(this.formModle.value);
      // 发射用户填写的过滤信息
      this.productService.searchEvent.emit(this.formModle.value);
    }
  }
}
