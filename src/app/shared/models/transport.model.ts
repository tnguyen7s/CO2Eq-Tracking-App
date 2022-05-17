export class Transport{
  constructor(public date: string,
              public distance: number,
              public distUnit: string,
              public fuelEfficiency: number,
              public fuelEfUnit: string,
              public fuelType: string,
              public eCo2InKg: number = 0)
              {
                this.date = date;
                this.distance = distance;
                this.distUnit = distUnit;
                this.fuelEfficiency = fuelEfficiency;
                this.fuelEfUnit = fuelEfUnit;
                this.fuelType = fuelType;
                this.eCo2InKg = eCo2InKg;
              }

    public clone()
    {
      return new Transport(this.date, this.distance, this.distUnit, this.fuelEfficiency, this.fuelEfUnit, this.fuelType, this.eCo2InKg);
    }
}
