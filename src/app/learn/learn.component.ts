import { Component, OnInit } from '@angular/core';
import { Blog } from '../shared/models/blog.model';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  public blogs: Blog[] = [
    new Blog(1,
            "Add Vietnamese Fried Tofu w/ Tomato Sauce – Đậu Sốt Cà Chua to Your Meal 😋",
            "Food",
            "https://source.unsplash.com/nK9rkNuNQG0/640x360",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem...",
            "2022-19-05")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
