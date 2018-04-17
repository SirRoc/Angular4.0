import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {

  transform(list: any[], filterContent: string, keyword: string): any {
    if(!filterContent || !keyword) {
      return list;
    }
    return list.filter(item => {
      let filterValue = item[filterContent];
      // 拿到标题1， 2 ，3字符串
      // indexOf 找到返回位置，找不到返回-1
      // 匹配到一个字符返回0， 全部匹配返回位置
      return filterValue.indexOf(keyword) >=0;
    })
  }

}
