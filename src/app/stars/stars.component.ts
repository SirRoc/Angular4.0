import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  // 装饰器
  @Input()
  // 初始化星级
  private rating: number = 0;
  // 星级
  private stars: boolean[];

  // 默认只读,可插入
  @Input()
  private readonly: boolean = true;

  @Output()
  public ratingChange: EventEmitter<number>= new EventEmitter();

  constructor() {
  }
  ngOnInit() {

  }
  ngOnChanges() {
    // 一个false代表1星
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

  // 点击星星
  selectStar(event) {
    if (!this.readonly) {
      this.rating = event + 1;
      // 拿到星星数后，进行双向绑定,发射星星数
      this.ratingChange.emit(this.rating);
    }
  }
}
