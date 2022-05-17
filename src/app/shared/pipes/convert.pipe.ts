import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "convert"
})
export class ConvertPipe implements PipeTransform{
  transform(value: number, from: string, to: string) {
    if (from==="kgram" && to==="gram")
    {
      return (value*1000).toFixed(3);
    }
  }
}
