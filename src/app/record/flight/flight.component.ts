import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/shared/models/flight.model';
import { Eco2CalculatorService } from 'src/app/shared/services/eco2-calculator.service';
import { FlightService } from 'src/app/shared/services/flight.service';
import { ThirdPartyAPIService } from 'src/app/shared/services/third-party-api.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  public IATA_DEFINITION =
    "The International Air Transport Association's (IATA) Location Identifier is a unique 3-letter code used in aviation and also in logistics to identify an airport.";

  // Forms
  public datePickerForm: FormGroup;
  public flightForm: FormGroup;

  // Airport names
  public sourceAirportName: string = '';
  public destAirportName: string = '';
  public stopoversAirportName: string[] = [];

  // Nonexisting IATA code
  public nonExistingIATACode1: string;
  public nonExistingIATACode2: string;

  // Accordion Showed: control by the button click
  public accordionShowed = true;

  // Mode: create or update
  public isCreateMode = true;

  // states
  public isCalculatingEco2 = false;
  public showTotal = false;

  // data to display
  public eco2Total = 0;
  public newFlights: Flight[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightService: FlightService,
    private eco2CalculatorService: Eco2CalculatorService,
    private thirdpartyAPIService: ThirdPartyAPIService
  ) { }

  ngOnInit(): void {
    // initiate two forms
    // flight form
    const stopoversFormArray = new FormArray([]);

    this.flightForm = new FormGroup({
      sourceIATACtrl: new FormControl("", [
        Validators.required,
        this.iataCodeValidator.bind(this),
      ]),
      destIATACtrl: new FormControl("", [
        Validators.required,
        this.iataCodeValidator.bind(this),
      ]),
      cabinClassCtrl: new FormControl('ECONOMY', [Validators.required]),
      stopoversArray: stopoversFormArray,
    });

    // listen to changes on sourceIATACtrl
    this.flightForm.get('sourceIATACtrl').valueChanges.subscribe((value) => {
      if (this.flightForm.get('sourceIATACtrl').valid) {
        value = value.toUpperCase();
        this.thirdpartyAPIService.getAirportInfo(value).then((airportInfo) => {
          if (!airportInfo['name']) {
            // non existing code
            this.sourceAirportName = "";
            this.nonExistingIATACode1 = value;
          } else {
            this.sourceAirportName = airportInfo['name'];
            this.nonExistingIATACode1 = '';
          }
        });
      }
    });

    // listen to changes on destIATACtrl
    this.flightForm.get('destIATACtrl').valueChanges.subscribe((value) => {
      if (this.flightForm.get('destIATACtrl').valid) {
        value = value.toUpperCase();
        this.thirdpartyAPIService.getAirportInfo(value).then((airportInfo) => {
          if (!airportInfo['name']) {
            // non existing code
            this.destAirportName = "";
            this.nonExistingIATACode2 = value;
          } else {
            this.destAirportName = airportInfo['name'];
            this.nonExistingIATACode2 = '';
          }
        });
      }
    });

    // init date picker form
    this.datePickerForm = new FormGroup({
      "dateCtrl": new FormControl(null, [Validators.required]),
    });

    // if the route has dateSelected:
    // one thing to do: change dateCtrl value -> go to *
    if (this.route.snapshot.params['date']) {
      this.datePickerForm.setValue({
        'dateCtrl': this.route.snapshot.params['date']
      }); //step 1 - case 1
    }

    // * user changes the date: change route, refactor the form
    this.datePickerForm.get('dateCtrl').valueChanges.subscribe((date) => {
      this.onSelectDate(date);
    });

    if (this.datePickerForm.get('dateCtrl').value)
    {
      this.onSelectDate(this.datePickerForm.get('dateCtrl').value);
    }
  }

  onSelectDate(date: string)
  {
    if (date){
      this.router.navigate(['/record', 'flight', date]);
      this.refactorFlightForm(date);

      // change accordionShowed
      this.accordionShowed = true;
    }
  }

  // REFACTOR FORM IF FORM ALREADY SAVED
  async refactorFlightForm(date: string)
  {
    // by default reset the flight form
    this.resetFlightForm();

    if (!date) return;

    const flights = await this.flightService.searchFlightsByDate(date);

    if (flights.length>0)
    {
      // Forms
      for (let i=1; i<flights.length; i++)
      {
        this.onAddStopoverCtrl(flights[i].sourceIATA);
      }

      this.flightForm.patchValue({
        "sourceIATACtrl": flights[0].sourceIATA,
        "destIATACtrl": flights[flights.length-1].destinationIATA,
        "cabinClassCtrl": flights[0].cabinClass,
      }
      );

      // Airport names
      this.sourceAirportName = flights[0].sourceName;
      this.destAirportName = flights[flights.length-1].destinationName;
      this.stopoversAirportName= [];
      for (let i=1; i<flights.length; i++)
      {
        this.stopoversAirportName.push(flights[i].sourceName);
      }

      // change to Update Mode
      this.isCreateMode = false;
    }
    else
    {
      this.isCreateMode = true;
    }
  }

  // GET CONTROLs
  getStopoverCtrlArray() {
    return (<FormArray>this.flightForm.get('stopoversArray')).controls;
  }

  // CLICK HANDLERS
  onAddStopoverCtrl(initialValue=null) {
    // set up form ctrl
    const formCtrl = new FormControl(initialValue, [
      Validators.required,
      this.iataCodeValidator.bind(this),
    ]);

    const index = (<FormArray>this.flightForm.get("stopoversArray")).length;

    // listen to value change
    formCtrl.valueChanges.subscribe((value)=>{
      if (formCtrl.valid)
      {
        value = value.toUpperCase();
        this.thirdpartyAPIService.getAirportInfo(value).then((airportInfo) => {
          // valid but not exist
          if (!airportInfo["name"])
          {
            this.stopoversAirportName[index] = "";
          }
          else
          {
            this.stopoversAirportName[index] = airportInfo["name"];
          }
        });
      }
    });

    //add form ctrl to the form array
    (<FormArray>this.flightForm.get('stopoversArray')).push(formCtrl);
  }

  onRemoveStopoverCtrl(index: number) {
    (<FormArray>this.flightForm.get('stopoversArray')).removeAt(index);
  }

  async onSubmitFlightForm() {
    this.isCalculatingEco2 = true;

    const dateSelected = this.datePickerForm.get("dateCtrl").value;

    // remove the flights if they have been entered before and now users want to update
    await this.flightService.removeFlightsOnDate(dateSelected);

    // submit the form
    let { sourceIATACtrl, destIATACtrl, cabinClassCtrl, stopoversArray } =
      this.flightForm.value;

    let source = sourceIATACtrl;
    let sourceName = this.sourceAirportName;

    stopoversArray.push(destIATACtrl);
    this.stopoversAirportName.push(this.destAirportName);

    let index = 0;
    this.eco2Total = 0;

    this.newFlights = [];

    for (let dest of stopoversArray) {
      const eco2 = await this.eco2CalculatorService.calculateFlightEco2(
        source,
        dest,
        cabinClassCtrl
      );

      this.eco2Total += eco2;

      this.newFlights.push(
        new Flight(dateSelected, source.toUpperCase(), dest.toUpperCase(), cabinClassCtrl, eco2, sourceName, this.stopoversAirportName[index])
      );

      source = dest;
      sourceName = this.stopoversAirportName[index];
      index++;
    }

    this.flightService.addFlightsByDate(this.newFlights, dateSelected);

    this.isCalculatingEco2 = false;
    this.showTotal = true;

    this.resetFlightForm();
    this.datePickerForm.reset();
  }

  // reset the flight form
  private resetFlightForm()
  {
    this.flightForm.reset();

    const stopoversFormArray = <FormArray>this.flightForm.get("stopoversArray");
    stopoversFormArray.clear();

    this.flightForm.patchValue({
      sourceIATACtrl: null,
      destIATACtrl: null,
      cabinClassCtrl: "ECONOMY",
    })

    this.sourceAirportName = "";
    this.destAirportName = "";
    this.stopoversAirportName = [];
  }

  // FORM VALIDATOR
  iataCodeValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      const value = <string>control.value;

      if (
        !(value.length == 3 && value[0] != value[1] && value[1] != value[2])
      ) {
        return { 'Invalid IATA code': true };
      }
    }

    return null;
  }

  // some checks
  doesStopoverIATAsExist()
  {
    for (let n of this.stopoversAirportName)
    {
      if (!n) return false;
    }

    return true;
  }
}
