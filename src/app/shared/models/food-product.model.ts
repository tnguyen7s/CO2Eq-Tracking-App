export class FoodProduct{
  constructor(public foodName: string, public eco2PerServing: number, public foodType: string, public foodImgTag: string)
  {
    this.foodName = foodName;
    this.eco2PerServing = eco2PerServing;
    this.foodType = foodType;
    this.foodImgTag = foodImgTag;
  }
}
