import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  promotions = [
    {
      title: 'Bottines Femme- Simili Daim',
      oldPrice: '119.900 TND',
      newPrice: '79.900 TND',
      img: 'assets/item.jpg',
      rating: 4.5,
      discount: 50
    }
  ];

  products = [...this.promotions, ...this.promotions, ...this.promotions];

  getStarsArray(rating: number) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return {
      full: Array(full),
      half: half,
      empty: Array(empty)
    };
  }
}
