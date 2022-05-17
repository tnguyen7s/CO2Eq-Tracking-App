import { Injectable } from "@angular/core";
import { ThirdPartyAPIService } from "./third-party-api.service";

const SHORT_HAUL_PARAMS = {
  S: 153.51,
  PLF: 0.82,
  DC: 95,
  CF: 0.07,
  CW: {
    ECONOMY: 0.96,
    BUSINESS: 1.26,
    FIRST: 2.4
  },
  EF: 3.15,
  P: 0.54,
  M: 2,
  AF: 0.00038,
  A: 11.68,
  a: 0,
  b: 2.714,
  c: 1166.52
};

const LONG_HAUL_PARAMS = {
  S: 280.21,
  PLF: 0.82,
  DC: 95,
  CF: 0.26,
  CW: {
    ECONOMY: 0.8,
    BUSINESS: 1.54,
    FIRST: 2.4
  },
  EF: 3.15,
  P: 0.54,
  M: 2,
  AF: 0.00038,
  A: 11.68,
  a: 0.0001,
  b: 7.104,
  c: 5044.93
}

const DC = 95; //FLIGHT DISTANCE CORRECTION in km
const CORRECTION_FACTOR = 0.06;
const EARTH_RADIUS = 6371.009; // in km

@Injectable({
  providedIn: "root"
})
export class Eco2CalculatorService{
  //E: CO2-eq emissions per passenger [kg]
  //x: Flight Distance [km] which is defined as the sum of GCD, the great circle distance, and DC, a distance
  //correction for detours and holding patterns, and inefficiencies in the air traffic control systems [km]
  //S: Average number of seats (total across all cabin classes)
  //PLF: Passenger load factor
  //CF: Cargo factor
  //CW: Cabin class weighting factor
  //EF: CO2 emission factor for jet fuel combustion (kerosene)
  //M: Multiplier accounting for potential non-CO2 effects
  //P: CO2e emission factor for preproduction jet fuel, kerosene
  //AF: Aircraft factor
  //A: Airport infrastructure emissions

  constructor(private thirdpartyAPIService: ThirdPartyAPIService)
  {

  }

  // Reference: https://www.myclimate.org/fileadmin/user_upload/myclimate_-_home/01_Information/01_About_myclimate/09_Calculation_principles/Documents/myclimate-flight-calculator-documentation_EN.pdf
  async calculateFlightEco2(sourceAirportIATA: string, destAirportIATA:string, cabinClass: string){
    let distance = await this.calculateFlightDistance(sourceAirportIATA, destAirportIATA);
    distance = distance + DC;
    if (distance<1500)
    {
      return this.calculateFlightEco2ForShortHaulFlight(distance, cabinClass);
    }
    else if (distance>2500)
    {
      return this.calculateFlightEco2ForLongHaulFlight(distance, cabinClass);
    }
    else
    {
      return this.calculateFlightEco2ForMediumHaulFlight(distance, cabinClass);
    }
  }

  private calculateFlightEco2ForMediumHaulFlight(distance: number, cabinClass:string):number{
    const x = distance;
    const x0 = 100;
    const y0 = this.calculateFlightEco2ForShortHaulFlight(x0, cabinClass);

    const x1 = 2600;
    const y1 = this.calculateFlightEco2ForLongHaulFlight(x1, cabinClass);

    return (y1*(x-x0)-y0*(x-x1))/(x1-x0);

  }

  private calculateFlightEco2ForLongHaulFlight(distance: number, cabinClass:string):number
  {
    const F = LONG_HAUL_PARAMS;
    const x = distance;
    return ((F.a*x*x+F.b*x+F.c)/(F.S*F.PLF))*(1-F.CF)*F.CW[cabinClass]*(F.EF*F.M+F.P) + F.AF*x + F.A;
  }

  private calculateFlightEco2ForShortHaulFlight(distance: number, cabinClass: string):number
  {
    const F = SHORT_HAUL_PARAMS;
    const x = distance;
    return ((F.a*x*x+F.b*x+F.c)/(F.S*F.PLF))*(1-F.CF)*F.CW[cabinClass]*(F.EF*F.M+F.P) + F.AF*x + F.A;
  }

  private async calculateFlightDistance(sourceIATA: string, destIATA:string)
  {
    const source = {
      "longitude": 0,
      "latitude": 0
    }

    const dest = {
      "longitude": 0,
      "latitude": 0
    }

    let greatestCircleDistance = 0;

    const resData1 = await this.thirdpartyAPIService.getAirportInfo(sourceIATA);
    source.latitude = resData1["latitude"]*Math.PI/180;
    source.longitude = resData1["longitude"]*Math.PI/180;

    const resData2 = await this.thirdpartyAPIService.getAirportInfo(destIATA);
    dest.latitude = resData2["latitude"] * Math.PI / 180;
    dest.longitude = resData2["longitude"] * Math.PI / 180;

    // formula to calculate GCD: https://www.vcalc.com/wiki/vCalc/Haversine+-+Distance

    greatestCircleDistance = 2*EARTH_RADIUS*Math.asin(Math.sqrt(
                              Math.pow(Math.sin((source.latitude-dest.latitude)/2), 2)
                            + Math.cos(source.latitude)*Math.cos(dest.latitude)*Math.pow(Math.sin((source.longitude-dest.longitude)/2), 2)));

    console.log("greatest circle distance", greatestCircleDistance);
    return greatestCircleDistance;
  }
}
