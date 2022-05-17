export class Fuel{
  public type: string;
  public value: number;
  public units: string;
  public date: string;
  public co2eInKg?: number;

  constructor(type: string, value: number, units: string, date: string, co2eInKg: number = 0)
  {
    this.type = type;
    this.value = value;
    this.units = units;
    this.date = date;
    this.co2eInKg = co2eInKg;
  }
}
