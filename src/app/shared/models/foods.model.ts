import { FoodProduct } from "src/app/shared/models/food-product.model";

export class Foods
{
  // DATA SOURCE: https://ourworldindata.org/grapher/ghg-per-protein-poore?tab=table&country=Pig+Meat~Beef+%28beef+herd%29~Eggs~Lamb+%26+Mutton~Grains~Milk~Other+Pulses~Poultry+Meat~Tofu+%28soybeans%29~Peas~Nuts~Groundnuts~Fish+%28farmed%29~Cheese~Beef+%28dairy+herd%29~Prawns+%28farmed%29~Apples~Bananas~Berries+%26+Grapes~Brassicas~Cassava~Citrus+Fruit~Coffee~Dark+Chocolate~Maize~Onions+%26+Leeks~Oatmeal~Potatoes~Rice~Root+Vegetables~Tomatoes~Wheat+%26+Rye
  public static KG_ECO2_PER_100G_DATA = {
    "Dark Chocolate": 93.3,
    "Beef (beef herd)": 49.89,
    "Coffee": 35.66,
    "Lamb & Mutton": 19.85,
    "Tomatoes": 19,
    "Prawns (farmed)": 18.19,
    "Beef (dairy herd)": 16.87,
    "Berries & Grapes": 15.3,
    "Cassava": 14.67,
    "Apples": 14.33,
    "Cheese": 10.82,
    "Bananas": 9.56,
    "Milk": 9.5,
    "Pig Meat": 7.61,
    "Citrus Fruit": 6.5,
    "Rice": 6.27,
    "Fish (farmed)": 5.98,
    "Poultry Meat": 5.7,
    "Brassicas": 4.64,
    "Root Vegetables": 4.3,
    "Eggs": 4.21,
    "Onions & Leeks": 3.85,
    "Potatoes": 2.71,
    "Grains": 2.7,
    "Tofu (soybeans)":1.98,
    "Oatmeal": 1.91,
    "Maize": 1.79,
    "Wheat & Rye": 1.29,
    "Groundnuts": 1.23,
    "Other Pulses": 0.84,
    "Peas": 0.44,
    "Nuts": 0.26
  };

  // DATA SOURCE: https://www.bbc.com/news/science-environment-46459714
  public static FOOD_PRODUCTS_BY_NAME = {
    "Apple": new FoodProduct("Apple", 0.032, "Fruit and vegetables", "fa-apple"),
    "Avocados": new FoodProduct("Avocados", 0.198, "Fruit and vegetables", "fa-avocado"),
    "Bananas": new FoodProduct("Bananas", 0.069, "Fruit and vegetables", "fa-banana"),
    "Beans": new FoodProduct("Beans", 0.099, "Non-dairy proteins", "fa-bean"),
    "Beef": new FoodProduct("Beef", 7.762, "Non-dairy proteins", "fa-beef"),
    "Beer": new FoodProduct("Beer", 0.666, "Drink", "fa-beer"),
    "Grapes": new FoodProduct("Grapes", 0.121, "Fruit and vegetables", "fa-grape"),
    "Berries": new FoodProduct("Berries", 0.121, "Fruit and vegetables", "fa-berry"),
    "Bread": new FoodProduct("Bread", 0.058, "Starchy foods", "fa-bread"),
    "Cheese": new FoodProduct("Cheese", 0.965, "Dairy", "fa-cheese"),
    "Chicken": new FoodProduct("Chicken", 1.362, "Non-dairy proteins", "fa-chicken"),
    "Chocolate (dark)": new FoodProduct("Chocolate (dark)", 1.483, "Fruit and vegetables", "fa-chocolate"),
    "Chocolate (milk)": new FoodProduct("Chocolate (milk)", 1.028, "Fruit and vegetables", "fa-chocolate"),
    "Citrus Fruit": new FoodProduct("Citrus Fruit", 0.031, "Fruit and vegetables", "fa-cirtrus"),
    "Coffee": new FoodProduct("Coffee", 0.425, "Drink", "fa-coffee"),
    "Egg": new FoodProduct("Egg", 0.554, "Non-dairy proteins", "fa-egg"),
    "Fish (farmed)": new FoodProduct("Fish (farmed)", 1.872, "Non-dairy proteins", "fa-fish"),
    "Lamb":  new FoodProduct("Lamb", 4.335, "Non-dairy proteins", "fa-lamb"),
    "Milk (almond)": new FoodProduct("Milk (almond)",0.14, "Dairy", "fa-almond"),
    "Milk (cow)": new FoodProduct("Milk (cow)", 0.628, "Dairy", "fa-cow"),
    "Milk (oat)": new FoodProduct("Milk (oat)", 0.178, "Dairy", "fa-oat"),
    "Milk (rice)": new FoodProduct("Milk (rice)", 0.236, "Dairy", "fa-rice"),
    "Milk (soy)": new FoodProduct("Milk (soy)", 0.195, "Dairy", "fa-soy"),
    "Nuts": new FoodProduct("Nuts", 0.014, "Non-dairy proteins", "fa-nut"),
    "Oatmeal": new FoodProduct("Oatmeal", 0.104, "Starchy foods", "fa-oatmeal"),
    "Pasta": new FoodProduct("Pasta", 0.118, "Starchy foods", "fa-pasta"),
    "Peas": new FoodProduct("Peas", 0.017, "Fruit and vegetables", "fa-pea"),
    "Pork": new FoodProduct("Pork", 1.798, "Non-dairy proteins", "fa-pork"),
    "Potatoes": new FoodProduct("Potatoes", 0.044, "Starchy foods", "fa-potato"),
    "Prawned (farmed)": new FoodProduct("Prawned (farmed)", 3.44, "Non-dairy proteins", "fa-prawned"),
    "Rice": new FoodProduct("Rice", 0.332, "Starchy foods", "fa-rice"),
    "Tea": new FoodProduct("Tea", 0.041, "Drink", "fa-tea"),
    "Tofu": new FoodProduct("Tofu", 0.159, "Non-dairy proteins", "fa-tofu"),
    "Tomatoes": new FoodProduct("Tomatoes", 0.165, "Fruit and vegetables", "fa-tomato"),
    "Wine": new FoodProduct("Wine", 0.313, "Drink", "fa-wine")
  };

  public static FOODS_BY_TYPE ={
    "Starchy foods": [
      Foods.FOOD_PRODUCTS_BY_NAME["Bread"],
      Foods.FOOD_PRODUCTS_BY_NAME["Oatmeal"],
      Foods.FOOD_PRODUCTS_BY_NAME["Pasta"],
      Foods.FOOD_PRODUCTS_BY_NAME["Potatoes"],
      Foods.FOOD_PRODUCTS_BY_NAME["Rice"]
    ],
    "Non-dairy proteins": [
      Foods.FOOD_PRODUCTS_BY_NAME["Beans"],
      Foods.FOOD_PRODUCTS_BY_NAME["Beef"],
      Foods.FOOD_PRODUCTS_BY_NAME["Chicken"],
      Foods.FOOD_PRODUCTS_BY_NAME["Egg"],
      Foods.FOOD_PRODUCTS_BY_NAME["Fish (farmed)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Lamb"],
      Foods.FOOD_PRODUCTS_BY_NAME["Nuts"],
      Foods.FOOD_PRODUCTS_BY_NAME["Pork"],
      Foods.FOOD_PRODUCTS_BY_NAME["Prawned (farmed)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Tofu"]
    ],
    "Dairy": [
      Foods.FOOD_PRODUCTS_BY_NAME["Cheese"],
      Foods.FOOD_PRODUCTS_BY_NAME["Milk (almond)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Milk (cow)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Milk (oat)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Milk (rice)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Milk (soy)"],
    ],
    "Fruit and vegetables": [
      Foods.FOOD_PRODUCTS_BY_NAME["Apple"],
      Foods.FOOD_PRODUCTS_BY_NAME["Avocados"],
      Foods.FOOD_PRODUCTS_BY_NAME["Bananas"],
      Foods.FOOD_PRODUCTS_BY_NAME["Grapes"],
      Foods.FOOD_PRODUCTS_BY_NAME["Berries"],
      Foods.FOOD_PRODUCTS_BY_NAME["Citrus Fruit"],
      Foods.FOOD_PRODUCTS_BY_NAME["Peas"],
      Foods.FOOD_PRODUCTS_BY_NAME["Tomatoes"],
      Foods.FOOD_PRODUCTS_BY_NAME["Chocolate (dark)"],
      Foods.FOOD_PRODUCTS_BY_NAME["Chocolate (milk)"]
    ],
    "Drink": [
      Foods.FOOD_PRODUCTS_BY_NAME["Beer"],
      Foods.FOOD_PRODUCTS_BY_NAME["Coffee"],
      Foods.FOOD_PRODUCTS_BY_NAME["Tea"],
      Foods.FOOD_PRODUCTS_BY_NAME["Wine"]
    ]
  }

}
