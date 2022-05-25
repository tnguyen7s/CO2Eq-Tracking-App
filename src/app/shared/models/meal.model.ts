export class Meal{
  constructor(public foodProducts: string[], public totalEco2InKg: number, public date: string, public meal: string, public id: number=-1)
  {
    this.foodProducts = foodProducts; // a list of food products
    this.totalEco2InKg = totalEco2InKg; // total of Co2 equivalent in Kilogram
    this.date = date; // the date
    this.meal = meal; // breakfast/lunch/dinner
    this.id=id;
  }
}
