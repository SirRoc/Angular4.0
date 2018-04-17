import {Component, OnChanges, OnInit, Output} from '@angular/core';
import {Product, Comment, ProductService} from "../share/product.service";
import {ActivatedRoute} from "@angular/router";
import "rxjs/Rx";
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  constructor(private routerInfo: ActivatedRoute,
              private productServerce: ProductService) {
  }
  product: Product;
  comments: Comment[];

  // 获取提交内容
  // 获取星星数
  private newComment: string;
  private newStar: number = 5;
  // 星星平均数
  private starAVG: number = 3;
  // 隐藏显示
  public isComment: boolean = true;

  ngOnInit() {
    // 拿到路由的点击信息id
    let productId = this.routerInfo.snapshot.params['productId'];
    this.productServerce.getProductId(productId).subscribe(
      products => this.product = products
    );
    this.productServerce.getCommentForProduct(productId).subscribe(
      comments => this.comments = comments
    );
  }
  // 提交评价内容
  submitComment() {
    if(this.newComment) {
      let submitComment = new Comment(3,this.product.id,'Roc',new Date().toISOString(),this.newComment,100,this.newStar);
      this.comments.unshift(submitComment);
      this.newStar = 5;
      this.newComment = null;
      // 统计星星数量
      let sum = this.comments.reduce((sum,comment) => {
        return sum + comment.rating;
      },0)
      this.starAVG = sum / this.comments.length;
      this.isComment = true;
    }
  }
}

