import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Foods } from 'src/app/shared/models/foods.model';
import { FoodService } from 'src/app/shared/services/food.service';
import { FoodProduct } from '../../../shared/models/food-product.model';

@Component({
  selector: 'app-plate-food-picker',
  templateUrl: './plate-food-picker.component.html',
  styleUrls: ['./plate-food-picker.component.css']
})
export class PlateFoodPickerComponent implements OnInit, OnDestroy {
  private sub1: Subscription;
  private sub2: Subscription;

  // food type selected, bind with the select element
  public foodType = "Starchy foods";

  // the list is obtained from the foods.model.ts
  public foodListByType: {[type: string]: FoodProduct[]};

  // food put on the plate by user
  @Input() foodSelected: FoodProduct[];

  // Input from the food componenent
  @Input("meal") meal: string;

  // The drop list id, init in ngOnInit using the meal Input to generate unique id for each droplist
  public selectedDropListId: string;
  public unselectedDropListId: string;

  // eco2 total
  public eco2Total = 0;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodListByType = Foods.FOODS_BY_TYPE;

    this.selectedDropListId = this.meal + "-selected-food-list";
    this.unselectedDropListId = this.meal + "-unselected-food-list";

    this.sub1=this.foodService.resetPlate.subscribe((value)=>{
      if (value){
        this.eco2Total = 0;
        this.foodSelected.splice(0, this.foodSelected.length);
      }
    });

    this.sub2 = this.foodService.setPlate.subscribe((value)=>{
      if (value){
        this.eco2Total = 0;
        this.foodSelected.forEach(f=>this.eco2Total+=f.eco2PerServing);
      }
    })
  }

  // HANDLE ON DRAG AND DROP
  onMoveOutOfPlate(ev){
    if (!(ev.container.id === ev.previousContainer.id)) {
      const index = ev.item.data;
      this.eco2Total -= this.foodSelected[index].eco2PerServing;
      this.foodSelected.splice(index, 1);
    }
  }

  onDropToPlate(ev){
    if (!(ev.container.id === ev.previousContainer.id)){
      const foodProduct = ev.item.data;
      this.eco2Total += foodProduct.eco2PerServing;
      this.foodSelected.push(foodProduct);
    }
  }


  // GET FOOD LIST BY FOOD TYPE
  getFoodListBySelectedType(){
    return this.foodListByType[this.foodType];
  }


  getFoodTypeAbbre(foodItem: FoodProduct){
    switch(foodItem.foodType)
    {
      case "Fruit and vegetables":
        return "vegetables";
      case "Non-dairy proteins":
        return "protein";
      case "Drink":
        return "drink";
      case "Dairy":
        return "dairy";
      case "Starchy foods":
        return "starchy";
    }
  }

  // NG ON DESTROY
  ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }
}
