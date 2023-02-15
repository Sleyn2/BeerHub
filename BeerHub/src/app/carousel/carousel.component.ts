import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [NgbCarouselModule, NgFor, FormsModule, RouterModule],
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

	private cookieName: string = 'LastBeerSite'

	images: string[]
	titles: string[]
	router_links: string[]

	paused = false;

	constructor(private cookieService: CookieService) {
		if (this.cookieService.check(this.cookieName) == false) {
			this.images = [1, 2, 3].map((n) => `../../assets/carousel_images/${n}.png`);

			this.titles = ["Beer throughout the history", "Types of beer", "Random beer",]

			this.router_links = ["beer-history", "beer-types", "random-beer"]
		}
		else {
			this.images = [1, 2, 3, 3].map((n) => `../../assets/carousel_images/${n}.png`);

			this.titles = ["Beer throughout the history", "Types of beer", "Random beer", "Last beer"]

			this.router_links = ["beer-history", "beer-types", "random-beer", "last-beer"]
		}
	}

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (!slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
}
