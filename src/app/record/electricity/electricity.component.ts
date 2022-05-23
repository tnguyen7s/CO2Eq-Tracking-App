import { Component, OnInit} from '@angular/core';
import { ControlContainer, Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Electricity } from 'src/app/shared/models/electricity.model';
import { Fuel } from 'src/app/shared/models/fuel.model';
import { ElectricityService } from 'src/app/shared/services/electricity.service';
import { FuelService } from 'src/app/shared/services/fuel.service';
import { ThirdPartyAPIService } from 'src/app/shared/services/third-party-api.service';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent implements OnInit{
  // date selected
  dateSelected: string;

  // ngClass condition: used by the accordion class "show"
  electricityShowed = false;

  // ngClass condition: used by the accordion class "show"
  fuelsShowed = false;

  // Form objects
  electricityForm: FormGroup;
  fuelsForm: FormGroup;
  datePickerForm: FormGroup;

  // used to hide the form and show the "eCO2 result" when value is "true"
  completeElectricityForm = false;
  completeFuelForm = false;

  //bind the button contens with these strings
  eSubmitButton = "Save";
  fSubmitButton = "Save"

  // used to display the eCO2 result after form is "saved"
  eDisplayed: Electricity;
  fuelsDisplayed: Fuel[];
  fTotal: number;

  // used to control the display/undisplay the prompt block "Do you want to update?" when user clicks no
  eWantToUpdate = true;
  fWantToUpdate = true;

  // used to show/unshow the loading spinner
  isCalculatingE = false;
  isCalculatingF = false;

  // constructor for dependency injection
  constructor(private router: Router,
              private route: ActivatedRoute,
              private electricityService: ElectricityService,
              private fuelService: FuelService,
              private thirdPartyAPIService: ThirdPartyAPIService) {

  }

  // ngOnInit called two times: one time is when this component is first loaded, and the second time when changing the route for the first time
  ngOnInit(): void {
    // when route params change (a date is added to the route), set the dateSelected
    this.route.params.subscribe((params: Params)=>{
      this.dateSelected = params["date"];

      // reset back if not
      this.eWantToUpdate = true;
      this.fWantToUpdate = true;

      // when user reselect another date, component is already there
      if (this.datePickerForm)
      {
        this.refactorForm();
      }
    })

    // init the form object for datePicker: this dataSelected = null | params["date"]
    this.datePickerForm = new FormGroup({
      "datePickerCtrl": new FormControl(this.dateSelected, [Validators.required])
    });

    // When user pick a date, append the date to the route, and thus reload the component
    this.datePickerForm.get("datePickerCtrl").valueChanges.subscribe((date)=>{
      this.onSelectDate(date);
    })

    // init the form objects with the selected date
    // electricity form
    this.electricityForm = new FormGroup({
      "valueCtrl": new FormControl(null, [Validators.required]),
      "unitCtrl": new FormControl(null, [Validators.required]),
      "dateCtrl": new FormControl(this.dateSelected)
    });

    // fuel form
    const fuelForm = new FormGroup({
      "typeCtrl": new FormControl(null, [Validators.required]),
      "valueCtrl": new FormControl(null, [Validators.required]),
      "unitCtrl": new FormControl(null, [Validators.required]),
      "dateCtrl": new FormControl(this.dateSelected)
    });

    this.fuelsForm = new FormGroup({
      "fuelsArray": new FormArray([fuelForm])
    })

    if (this.dateSelected){
      this.refactorForm();
    }
  }

  onSelectDate(date: string){
    this.router.navigate(["/record", "electricity", date])
  }

  refactorForm()
  {
    this.onRefactorEFormWithGivenDate();
    this.onRefactorFFormWithGivenDate();
  }

  onRefactorEFormWithGivenDate(){
    this.completeElectricityForm = false;

    const electricity = this.electricityService.searchElectricityByDate(this.dateSelected);

    if (electricity)
    {
      this.electricityForm.setValue({
        'valueCtrl': electricity.value,
        'unitCtrl': electricity.units,
        'dateCtrl': electricity.date
      });
      this.eSubmitButton = "Update";
    }
    else
    {
      this.electricityForm.reset();
      this.electricityForm.setValue({
        "valueCtrl": null,
        "unitCtrl": null,
        "dateCtrl": this.dateSelected
      });
      this.eSubmitButton="Save";
    }
  }

  onRefactorFFormWithGivenDate()
  {
    this.completeFuelForm = false;

    const fuels= this.fuelService.searchFuelByDate(this.dateSelected);

    (<FormArray>this.fuelsForm.get("fuelsArray")).clear();

    if (fuels.length>0){
      for (const fuel of fuels){
        (<FormArray>this.fuelsForm.get("fuelsArray")).push(
          new FormGroup({
            "typeCtrl": new FormControl(fuel.type, [Validators.required]),
            "valueCtrl": new FormControl(fuel.value, [Validators.required]),
            "unitCtrl": new FormControl(fuel.units, [Validators.required]),
            "dateCtrl": new FormControl(this.dateSelected)
          })
        );
      }

      this.fSubmitButton = "Update"
    }
    else{
      (<FormArray>this.fuelsForm.get("fuelsArray")).push(
        new FormGroup({
          "typeCtrl": new FormControl(null, [Validators.required]),
          "valueCtrl": new FormControl(null, [Validators.required]),
          "unitCtrl": new FormControl(null, [Validators.required]),
          "dateCtrl": new FormControl(this.dateSelected)
        })
      );
      this.fSubmitButton="Save";
    }
  }

  onSubmitElectricityForm(){
    this.isCalculatingE = true;

    this.electricityService.removeElectricityByDate(this.dateSelected);

    const {valueCtrl, unitCtrl, dateCtrl} = this.electricityForm.value;
    const e = new Electricity(valueCtrl, unitCtrl, dateCtrl);


    this.thirdPartyAPIService.getCo2eOfGivenElectricityCloverly(e)
          .subscribe((resData)=> {
                      e.co2eInKg = resData["total_co2e_in_kg"];
                      this.electricityService.addElectricity(e);
                      this.eDisplayed = e;
                      this.completeElectricityForm = true;
                      this.isCalculatingE = false;
                    },
                    (error)=>{
                      console.log(error);
                      this.isCalculatingE = false;
                    }
          );

    this.electricityForm.reset();
    this.datePickerForm.reset();
  }

  async onSubmitFuelsForm(){
    this.isCalculatingF = true;

    this.fuelService.removeFuelByDate(this.dateSelected);

    const fuels = <FormArray>this.fuelsForm.get("fuelsArray");
    let f: Fuel;
    this.fTotal = 0;
    this.fuelsDisplayed = [];

    for (let fuel of fuels.controls){
      const {typeCtrl, valueCtrl, unitCtrl, dateCtrl} = fuel.value;

      f = new Fuel(typeCtrl, valueCtrl, unitCtrl, dateCtrl);
      const resData = await this.thirdPartyAPIService.getCo2eOfGivenFuelCloverly(f)
      f.co2eInKg = resData["total_co2e_in_kg"];

      this.fuelService.addFuel(f);
      this.fuelsDisplayed.push(f);
      this.fTotal += f.co2eInKg;
    }

    this.completeFuelForm = true;
    this.isCalculatingF = false;

    this.fuelsForm.reset();
    this.datePickerForm.reset();
  }

  onAddFuelGroup()
  {
    const fuelForm = new FormGroup({
      "typeCtrl": new FormControl(null, [Validators.required]),
      "valueCtrl": new FormControl(null, [Validators.required]),
      "unitCtrl": new FormControl(null, [Validators.required]),
      "dateCtrl": new FormControl(this.dateSelected)
    });
    (<FormArray>this.fuelsForm.get("fuelsArray")).push(fuelForm);
  }

  onRemoveFuelGroup(index: number)
  {
    (<FormArray>this.fuelsForm.get("fuelsArray")).removeAt(index);

  }

  getFuelGroups()
  {
    return <FormArray>this.fuelsForm.get('fuelsArray');
  }

}
