import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transport } from 'src/app/shared/models/transport.model';
import { ThirdPartyAPIService } from 'src/app/shared/services/third-party-api.service';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-other-transports',
  templateUrl: './other-transports.component.html',
  styleUrls: ['./other-transports.component.css']
})
export class OtherTransportsComponent implements OnInit {
  public dateForm: FormGroup;
  public transportForm: FormGroup;

  // Button
  public button = "Submit";

  // state
  public isCalculatingEco2 = false;
  public completeSavingForm = false;

  //Transport
  public trip: Transport;

  constructor(private thirdPartApiService: ThirdPartyAPIService,
              private transportService: TransportService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // init the date form
    this.dateForm = new FormGroup({
      "dateCtrl": new FormControl(null, [Validators.required])
    });

    // init the transport form
    this.transportForm = new FormGroup({
      "distanceCtrl": new FormControl(0, [Validators.required]),
      "distUnitCtrl": new FormControl("miles", [Validators.required]),
      "fuelEfficiencyCtrl": new FormControl(0, [Validators.required]),
      "fuelEffUnitCtrl": new FormControl("mpg", [Validators.required]),
      "fuelTypeCtrl": new FormControl("gasoline", [Validators.required])
    });

    this.dateForm.get("dateCtrl").valueChanges.subscribe(date=>{
      this.onDateSelected(date);
    })

    if (this.dateForm.get("dateCtrl").value)
    {
      this.onDateSelected(this.dateForm.get("dateCtrl").value);
    }

    if (this.route.snapshot.params["date"])
    {
      this.dateForm.setValue({
        "dateCtrl":this.route.snapshot.params["date"]
      })
    }

  }

  async onDateSelected(date: string)
  {
    if (date){
      // change route
      this.router.navigate(["record", "other-transports", date]);

      // refactor the form if data existing
      const data = await this.transportService.getTransportByDate(date);
      if (data)
      {
        this.setTransportForm(data.distance, data.distUnit, data.fuelEfficiency, data.fuelEfUnit, data.fuelType)
        this.button = "Update";
      }
      else
      {
        this.setTransportForm();
        this.button = "Submit";
      }

      // change complete saving form to be false
      this.completeSavingForm = false;
    }
  }

  async onSubmitTransportsForm(){
    const date = this.dateForm.get("dateCtrl").value
    // delete the transport record, if it is already in the db
    await this.transportService.removeTransportByDate(date);

    this.isCalculatingEco2 = true;
    // get form input
    const {distanceCtrl, distUnitCtrl, fuelEfficiencyCtrl, fuelEffUnitCtrl, fuelTypeCtrl} = this.transportForm.value;
    const trip = new Transport(date, distanceCtrl, distUnitCtrl, fuelEfficiencyCtrl, fuelEffUnitCtrl, fuelTypeCtrl);

    // send request and get eco2 in kg
    this.thirdPartApiService.getCo2eOfGivenTransportCloverly(trip)
    .subscribe((resData)=>{
      // when response is returned (async), get the co2e, and save the Transport into the service
      trip.eCo2InKg = resData["total_co2e_in_kg"];
      this.transportService.createTransport(trip);

      this.isCalculatingEco2 = false;

      this.completeSavingForm = true;
      this.trip = trip;
    },
    (error)=>{
      console.log(error);
      this.isCalculatingEco2 = false;
    })

    // reset the form
    this.dateForm.reset();
    this.setTransportForm();
  }

  private setTransportForm(distance: number=0, distUnit: string="miles", fuelEfficiency: number=0, fuelEffUnit: string="mpg", fuelType: string="gasoline")
  {
    this.transportForm.setValue({
      "distanceCtrl": distance,
      "distUnitCtrl": distUnit,
      "fuelEfficiencyCtrl": fuelEfficiency,
      "fuelEffUnitCtrl": fuelEffUnit,
      "fuelTypeCtrl": fuelType
    })
  }

  async onDeleteTransportRecord()
  {
    const date = this.dateForm.get("dateCtrl").value
    // delete the transport record, if it is already in the db
    await this.transportService.removeTransportByDate(date);

    // reset the form
    this.dateForm.reset();
    this.setTransportForm();

    alert('You transport CO2 equivalent record has been deleted!')
  }

}
