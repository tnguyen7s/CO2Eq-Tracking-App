import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { FoodProduct } from 'src/app/shared/models/food-product.model';
import { Foods } from 'src/app/shared/models/foods.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public dateForm: FormGroup;

  // to determine which tab to be shown
  public factsActive = true;
  public chartActive = false;
  public tableActive = false;

  // to toggle the accordions
  public showBreakfast = true;
  public showLunch = true;
  public showDinner = true;

  // Food lists - passed to the app-plate-food-picker and modified inside this component
  public breakfastFoodList: FoodProduct[] = [];
  public lunchFoodList: FoodProduct[] = [];
  public dinnerFoodList: FoodProduct[] = [];

  // total for each meal
  public totalBreakfast = 0;
  public totalLunch = 0;
  public totalDinner = 0;
  public dateSelected = "";

  public showEc02ResultBox = false;

  constructor(private foodService: FoodService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // init form
    this.dateForm = new FormGroup({
      "date": new FormControl(null, [Validators.required])
    })

    // subscribe to the change of the date input
    this.dateForm.get("date").valueChanges.subscribe((value)=>{
      if (value)
      {
        this.onDateSelected(value);
      }
    })

    // on init
    if (this.dateForm.get("date").value)
    {
      this.onDateSelected(this.dateForm.get("date").value);
    }

    if (this.route.snapshot.params["date"])
    {
      this.dateForm.setValue({
        "date": this.route.snapshot.params["date"]
      })
      this.onDateSelected(this.dateForm.get("date").value);
    }
  }

  onDateSelected(date: string)
  {
    // change the route
    this.router.navigate(["/record", "food", date]);

    // load existing data if any
    const savedMeals = this.foodService.getMealsByDate(date);
    if (savedMeals)
    {
      const breakfastFoodNameList = savedMeals["breakfast"].foodProducts;
      this.breakfastFoodList.splice(0, this.breakfastFoodList.length);
      breakfastFoodNameList.forEach((f) => this.breakfastFoodList.push(Foods.FOOD_PRODUCTS_BY_NAME[f]));

      const lunchFoodNameList = savedMeals["lunch"].foodProducts;
      this.lunchFoodList.splice(0, this.lunchFoodList.length);
      lunchFoodNameList.forEach((f)=> this.lunchFoodList.push(Foods.FOOD_PRODUCTS_BY_NAME[f]));

      const dinnerFoodNameList = savedMeals["dinner"].foodProducts;
      this.dinnerFoodList.splice(0, this.dinnerFoodList.length);
      dinnerFoodNameList.forEach((f)=> this.dinnerFoodList.push(Foods.FOOD_PRODUCTS_BY_NAME[f]));

      this.foodService.setPlate.next(true);
    }
  }

  // HANDLE CLICKS ON THE INFO SECTION'S TABS
  onActivateFacts()
  {
    this.factsActive = true;

    this.chartActive = false;
    this.tableActive = false;
  }

  onActivateChart()
  {
    this.chartActive = true;

    this.factsActive = false;
    this.tableActive = false;
  }

  onActivateTable()
  {
    this.tableActive = true;

    this.factsActive = false;
    this.chartActive = false;
  }

  // HANDLES ON THE ACCORDION CLICKS
  onToggleBreakfastCard()
  {
    this.showBreakfast = !this.showBreakfast;
  }

  onToggleLunchCard()
  {
    this.showLunch = !this.showLunch;
  }

  onToggleDinnerCard()
  {
    this.showDinner = !this.showDinner;
  }

  // ON SUBMIT FORM
  onSubmitFoodForm(){
    // save data to cache
    const foodNamesForBreakfast = []
    const foodNamesForLunch = []
    const foodNamesForDinner = []

    this.totalBreakfast = 0;
    this.totalLunch = 0;
    this.totalDinner = 0;

    this.breakfastFoodList.forEach((f) => {
      foodNamesForBreakfast.push(f.foodName);
      this.totalBreakfast += f.eco2PerServing;
    });

    this.lunchFoodList.forEach((f)=>{
      foodNamesForLunch.push(f.foodName);
      this.totalLunch += f.eco2PerServing;
    })

    this.dinnerFoodList.forEach((f)=>{
      foodNamesForDinner.push(f.foodName);
      this.totalDinner += f.eco2PerServing;
    })

    const date = this.dateForm.get("date").value;
    this.foodService.addMealToCache(foodNamesForBreakfast, this.totalBreakfast, date, "breakfast");
    this.foodService.addMealToCache(foodNamesForLunch, this.totalLunch, date, "lunch");
    this.foodService.addMealToCache(foodNamesForDinner, this.totalDinner,date, "dinner");


    // reset
    this.breakfastFoodList.splice(0, this.breakfastFoodList.length);
    this.lunchFoodList.splice(0, this.lunchFoodList.length);
    this.dinnerFoodList.splice(0, this.dinnerFoodList.length);

    this.dateSelected = this.dateForm.get("date").value;

    this.dateForm.reset();

    this.showEc02ResultBox = true;

    this.foodService.resetPlate.next(true);
  }

}
