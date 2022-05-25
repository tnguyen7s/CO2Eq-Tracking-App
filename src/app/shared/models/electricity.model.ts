import { AuthService } from "src/app/auth/auth.service";

export class Electricity{
  public value: number;
  public units: string;
  public date: string;
  public co2eInKg?: number;
  public id?: number;

  constructor(value: number, units: string, date: string, co2eInKg: number = 0, id: number = -1)
  {
    this.value = value;
    this.units = units;
    this.date = date;
    this.co2eInKg = co2eInKg;
    this.id = id;
  }

  public clone(){
    return new Electricity(this.value, this.units, this.date, this.co2eInKg, this.id);
  }
}
