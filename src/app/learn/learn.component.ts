import { Component, OnInit } from '@angular/core';
import { Blog } from './blog.model';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  public blogs: Blog[] = [
    new Blog(12,
             "Ten simple ways to act on climate change",
             "Climate change",
             "https://ychef.files.bbci.co.uk/1600x900/p06qtnxs.webp",
             "",
             "https://www.bbc.com/future/article/20181102-what-can-i-do-about-climate-change"),
    new Blog(11,
            "Quick vegetarian recipes",
            "Food",
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/veggie-fajitas-d49e108.jpg?quality=90&webp=true&resize=375,341",
            "",
            "https://www.bbcgoodfood.com/recipes/collection/quick-veggie-recipes"),
    new Blog(1,
            "A simple and delicious Vietnamese Fried Tofu w/ Tomato Sauce – Đậu Sốt Cà Chua😋",
            "Food",
            "https://www.krumpli.co.uk/wp-content/uploads/2021/06/Vietnamese-Fried-Tofu-with-Tomato-Sauce-05-960x960.jpg.webp",
            "",
            "https://www.krumpli.co.uk/vietnamese-chicken-curry/"),
    new Blog(8,
            "Clusters of Weather Extremes Will Increase Risks to Corn Crops, Society",
            "Climate Change",
            "https://climate.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXRRQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--750ecfc015dae9034ef8fdafedb07920b744ff6a/main_image.jpg?disposition=attachment",
            "",
            "https://climate.nasa.gov/news/3158/clusters-of-weather-extremes-will-increase-risks-to-corn-crops-society/" ),
    new Blog(9,
            "Arctic Sea Ice Trend Since 1979 ",
            "Climate Change",
            "https://cdn.hswstatic.com/gif/arctic-circle.jpg",
            "",
            "https://climate.nasa.gov/interactives/global-ice-viewer"),
    new Blog(2,
            "Have a Warm Bowl of Vegetarian Tomato Noodle Soup in the winter days",
            "Food",
            "https://i0.wp.com/www.wokandkin.com/wp-content/uploads/2020/04/Bun-Rieu-Chay-saved-for-web.png?w=600&ssl=1",
            "",
            "https://www.wokandkin.com/bun-rieu-chay/"),
    new Blog(10,
            "Reducing Emissions to Lessen Climate Change Would Yield Dramatic Health Benefits by 2030 ",
            "Climate Change",
            "https://climate.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTBzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c24cbdf4984067616243e6c4bb9b6f06abd916e9/smoke-stacks-g271f8d73f_1600x900.jpg?disposition=attachment",
            "",
            "https://climate.nasa.gov/news/3134/reducing-emissions-to-lessen-climate-change-would-yield-dramatic-health-benefits-by-2030/"),
    new Blog(3,
            "A crispy Vietnamese Corn Egg Rolls dish to enjoy with your dearest.",
            "Food",
            "http://www.npfamilyrecipes.com/wp-content/uploads/2017/09/VietnameseEggroll.jpg",
            "",
            "http://wanderingchopsticks.blogspot.com/2008/06/cha-gio-bapram-bap-vietnamese-corn-egg.html"),
    new Blog(4,
            "A simple-making but tasty Mini Gimbap (Mayak Gimbap) dish",
            "Food",
            "https://www.koreanbapsang.com/wp-content/uploads/2015/05/DSC_08881-e1430745003591.jpg",
            "",
            "https://www.koreanbapsang.com/mini-gimbap-mayak-gimbap/"),
    new Blog(5,
            "Tortilla Wraps with Bean Sauce",
            "Food",
            "https://lh6.ggpht.com/QRJ2SoIHJkdNVCLG63hHJScsdf8ly2VK2-FTTvbOhn-MFzjX7Dqk94zSEihVa9dq1l52SJXqMEuFYnVkBs9CoqQ=s640-c-rj-v1-e365",
            "",
            "https://www.yummly.com/recipe/Tortilla-Wraps-with-Bean-Sauce-530324"),
    new Blog(6,
            "Vegan Banana Pancakes",
            "Food",
            "https://lh3.googleusercontent.com/EfRpiflE_w8yyO3dXBjJjFiRfrvPxgrnEqFdM0lQuI9_MCW34NfMFYVsEDp8Vh2Ykh3QmeNv7ntngpmNi1UPzQ=s640-c-rj-v1-e365",
            "",
            "https://www.yummly.com/recipe/Vegan-Banana-Pancakes-2650277"),
    new Blog(7,
            "A fresh Black Bean Coconut Stew",
            "Food",
            "https://sweetpotatosoul.com/wp-content/uploads/2018/03/Coconut-Black-bean-Stew-Instant-Pot-Vegan-Recipes-3.jpg",
            "",
            "https://sweetpotatosoul.com/instant-pot-black-beans/")
  ];

  public blogsToDisplay: Blog[];

  constructor() { }

  ngOnInit(): void {
    this.blogsToDisplay = this.blogs;
  }

  onFilterTopic(form){
    const topicToFilter:string = form.value['filter'];
    console.log(topicToFilter)

    this.blogsToDisplay = [];

    this.blogs.forEach((blog)=>{
      if (this.isBlogQualified(blog, topicToFilter))
      {
        this.blogsToDisplay.push(blog);
      }
    })

    console.log(this.blogsToDisplay)
  }

  isBlogQualified(blog: Blog, topic:string): boolean{
    topic = topic.toLowerCase();

    // if the title contains the topic, it qualifies
    if (blog.title.toLowerCase().search(topic)!=-1) {
      return true;
    }

    // if the topic keywords are in the title
    const keywords = topic.split(' ');
    for (let keyword of keywords)
    {
      if (blog.title.toLowerCase().search(keyword)!=-1 || blog.tag.toLowerCase() == keyword) return true;
    }
  }
}
