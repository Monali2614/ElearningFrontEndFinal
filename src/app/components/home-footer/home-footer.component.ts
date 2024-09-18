import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent{

  fallbackImage = 'assets/default-placeholder-image.png'; // Define a fallback image

  images = [
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 1' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 2' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 3' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },
    { src: 'assets/photo-1487017159836-4e23ece2e4cf.avif', alt: 'Image 4' },

    // Add more images as needed
  ];

  currentIndex = 0;

  moveSlide(step: number) {
    const totalSlides = this.images.length;

    // Update the index
    this.currentIndex = (this.currentIndex + step + totalSlides) % totalSlides;

    // Scroll to the active image
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    const activeItem = document.querySelectorAll('.carousel-item')[this.currentIndex] as HTMLElement;
  
    if (carouselInner && activeItem) {
      const offset = activeItem.offsetLeft - (carouselInner.offsetWidth - activeItem.offsetWidth) / 2;
      carouselInner.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  }
  
}
