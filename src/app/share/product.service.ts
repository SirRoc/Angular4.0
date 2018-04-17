import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductService {
  constructor(private http: Http) {
  }

  public searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
  // 获得所以的类别
  getAllCategorys(): string[] {
    return ['化妆品', '电子设备', '图书'];
  }
  // 获得商品组
  getProduct(): Observable<Product[]> {
    return this.http.get("/api/product").map(res => res.json())
  }

  // 获得指定商品
  getProductId(id: number): Observable<Product> {
    return this.http.get("/api/product/" + id).map(res => res.json())
  }

  getCommentForProduct(id: number): Observable<Comment[]> {
    return this.http.get("/api/product/" + id + "/comment").map(res => res.json())
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get("/api/products",{params: this.encodeParams(params)}).map(res => res.json())
  }
  // 获取输入的title，price，category。
  private encodeParams(params: ProductSearchParams){
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum:URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams);
  }

}


// 商品服务
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public desc: string,
    public rating: number,
    public category: Array<string>
  ) {}
};
// 商品评价
export class Comment {
  constructor(
    public id: number,
    public productID: number,
    public user: string,
    public time: string,
    public content: string,
    public price: number,
    public rating: number
  ) {}
}
// 商品参数
export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}
