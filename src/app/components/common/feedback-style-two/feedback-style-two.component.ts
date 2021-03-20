import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-feedback-style-two',
    templateUrl: './feedback-style-two.component.html',
    styleUrls: ['./feedback-style-two.component.scss']
})
export class FeedbackStyleTwoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    testimonialsSlides: OwlOptions = {
		loop: true,
		nav: false,
		dots: true,
		autoplayHoverPause: true,
		autoplay: true,
		rtl: true,
		center: true,
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
				items: 2
			},
			1200: {
				items: 3
			}
		}
    }

}