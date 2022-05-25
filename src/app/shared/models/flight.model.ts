export class Flight
{
  public date: string;
  public sourceIATA: string;
  public destinationIATA: string;
  public cabinClass: string;
  public sourceName?: string;
  public destinationName?:string;
  public co2eInKg?: number;
  public id: number;

  constructor(dateSelected: string, sourceIATA: string, destinationIATA:string, cabinClass:string, co2eInKg: number=0, sourceName: string="", destinationName:string="", id:number=-1)
  {
    this.date= dateSelected
    this.sourceIATA = sourceIATA;
    this.destinationIATA = destinationIATA;
    this.cabinClass =  cabinClass;
    this.co2eInKg = co2eInKg;
    this.sourceName = sourceName;
    this.destinationName = destinationName;
    this.id = id;
  }
}
