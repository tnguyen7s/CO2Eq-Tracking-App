import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform{
  transform(list: any[], by: string){
    if (!list) return list;
    
    list.sort((o1, o2)=>{
      if (o1[by]>o2[by]) return 1;
      else if (o1[by]<o2[by]) return -1;
      else return 0;
    })

    return list;
  }
}
