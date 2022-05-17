export class Electricity{
  public value: number;
  public units: string;
  public date: string;
  public co2eInKg?: number;

  constructor(value: number, units: string, date: string, co2eInKg: number = 0)
  {
    this.value = value;
    this.units = units;
    this.date = date;
    this.co2eInKg = co2eInKg;
  }
}
