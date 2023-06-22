import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: any[];
  interval: any;

  constructor(private router: Router) {
    this.slides = [
      { imgUrl: 'https://es-static.z-dn.net/files/dab/d4da0ccab6947b3a0c04f81fb159aeb8.jpg', altText: 'Slide 1', active: true },
      { imgUrl: 'https://focus.courrierinternational.com/2022/02/04/0/0/2400/1600/1200/630/60/0/bf48b76_1644016775460-incas1.jpg', altText: 'Slide 2', active: true },
      { imgUrl: 'https://www.galapagosunbound.com/sites/galapagosunbound.com/files/styles/open_graph/public/feature/Incan-Empire-Ecuador%20%281%29.jpg?itok=ZWT3dDij', altText: 'Slide 3', active: true }
    ];
  }

  ngOnInit() {
    this.startSlider();
  }

  startSlider() {
    this.interval = setInterval(() => {
      const activeIndex = this.slides.findIndex(slide => slide.active);
      const nextIndex = (activeIndex + 1) % this.slides.length;
      this.slides.forEach(slide => slide.active = false);
      this.slides[nextIndex].active = true;
    }, 2000); // Cambia el valor del intervalo en milisegundos (2 segundos en este ejemplo)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }
}
