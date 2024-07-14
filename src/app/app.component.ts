import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CarouselStripComponent } from './carousel-strip/carousel-strip.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CarouselStripComponent, MatButtonModule, MatInputModule, MatIconModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  // Initial scaling and rotation state
  currentScale = 1.0;
  currentRotation = 0;

  // Grid visibility state
  gridVisible = false;

  // Array to represent grid lines to display a 3X3 grid as overlay
  gridLines = new Array(9);

  // Index tracking for image navigation
  currentIndex: number = 0;

  // ViewChild reference for accessing carousal image strip
  @ViewChild('imageElement') imageElement: ElementRef;

  // Flag to track if child component (CarouselStripComponent) is loaded
  childComponentLoaded = false;

  // ViewChild reference for accessing CarouselStripComponent instance
  @ViewChild(CarouselStripComponent, { static: false }) CarouselStripComponent: CarouselStripComponent;

  // Array of image paths
  // this could be loaded from a json response using a service or network call, populate this array with image urls.
  // if required can integrate template image service or placeholder service.
  images = [
    '../assets/images/face1.jpg',
    '../assets/images/face2.png',
    '../assets/images/face3.jpg',
    '../assets/images/face4.jpg',
    '../assets/images/face5.jpg',
    '../assets/images/face6.jpg',
  ];

  // set first image from the array as the initial loaded image.
  currentImage: string = this.images[0];

  // AfterViewInit lifecycle hook to detect when child component is loaded
  // to extend the app component to handle bonus task of image carousal
  ngAfterViewInit() {
    this.childComponentLoaded = !!this.CarouselStripComponent; // Set childComponentLoaded based on presence of CarouselStripComponent
  }

  // Set the current image to display
  setCurrentImage(selectedImagePath: string) {
    this.currentImage = selectedImagePath;
  }

  // method to apply transformations (scale, rotate, flip) to the image
  applyTransform(scaleChange: number = 0, degrees: number = 0, axis?: 'x' | 'y') {
    const img: HTMLImageElement = this.imageElement.nativeElement;

    // Update scale and rotation based on parameters
    this.currentScale += scaleChange;
    if (this.currentScale < 0.2) {
      this.currentScale = 0.2; // Prevent zoom out going into negative values
    }
    this.currentRotation += degrees;

    // Reset rotation to 0 if it crosses 360 degrees
    if (this.currentRotation >= 360 || this.currentRotation <= -360) {
      this.currentRotation = 0;
    }

    // Check if there is an existing flip on x or y axis
    let currentTransform = img.style.transform;
    let flipX = currentTransform.includes('scaleX(-1)');
    let flipY = currentTransform.includes('scaleY(-1)');

    // Apply flip if axis is provided and not null
    if (axis !== undefined && axis !== null) {
      if (axis === 'x') {
        img.style.transform = flipX ? currentTransform.replace('scaleX(-1)', 'scaleX(1)') : currentTransform + ' scaleX(-1)';
      } else if (axis === 'y') {
        img.style.transform = flipY ? currentTransform.replace('scaleY(-1)', 'scaleY(1)') : currentTransform + ' scaleY(-1)';
      }
    } else {
      // Build the transform style based on currentScale and currentRotation
      img.style.transform = `scale(${this.currentScale}) rotate(${this.currentRotation}deg)`;
      if (flipX) {
        img.style.transform += ' scaleX(-1)';
      }
      if (flipY) {
        img.style.transform += ' scaleY(-1)';
      }
    }
  }

  // Toggle grid visibility
  showGrid() {
    this.gridVisible = !this.gridVisible;
  }

  // Reset image transformations (scale, rotation, flips)
  reset() {
    const img: HTMLImageElement = this.imageElement.nativeElement;
    this.currentScale = 1.0;
    this.currentRotation = 0;
    img.style.transform = `scale(1) rotate(0deg) scaleX(1) scaleY(1)`; // Reset all transformations
  }

  // Update the current image based on the selected image path
  updateCurrentImage(image: string) {
    this.currentImage = 'assets/' + image;
    this.reset(); // Reset transformations when updating the image
  }

  // Navigate through the image carousel (using the CarouselStripComponent)
  navigate(direction: 'prev' | 'next') {
    this.CarouselStripComponent.navigate(direction);
  }
}
