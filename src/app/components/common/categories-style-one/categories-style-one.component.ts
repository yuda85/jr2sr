import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-style-one',
  templateUrl: './categories-style-one.component.html',
  styleUrls: ['./categories-style-one.component.scss']
})
export class CategoriesStyleOneComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    categoriesSlides: OwlOptions = {
		loop: true,
		nav: true,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		rtl: true,
		margin: 30,
		navText: [
			"<i class='bx bx-right-arrow-alt'></i>",
			"<i class='bx bx-left-arrow-alt'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
    }

}