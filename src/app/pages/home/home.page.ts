import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('introSlides', { static: true }) introSlides: any;

  endReached: boolean = false;
  imgLoaded: boolean = false;

  sliderConfig = {
    centeredSlides: true,
    initialSlide: 0,
    speed: 400
  };

  slides = [
    { "image": "/assets/img/palillos.png", "price": "$18.00", "title": "Sweet Noodles", "type": "Chinese Food" },
    { "image": "/assets/img/carne.png", "price": "$22.00", "title": "Pita Steak", "type": "Spanish Food" },
    { "image": "/assets/img/pastel.png", "price": "$6.00", "title": "Chocolate Cake", "type": "Desserts" },
    { "image": "/assets/img/pasta.png", "price": "$16.00", "title": "Pesto Penne", "type": "Italian Food" }
  ];

  constructor() {

  }

  ngOnInit() {
    this.imgLoaded = false;
  }

  slideDidChange() {
    this.introSlides.isEnd().then(res => {
      this.endReached = res;
    });
  }

}
