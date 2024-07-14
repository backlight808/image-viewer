import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-carousel-strip',
  standalone: true,
  imports: [NgFor, NgClass, MatIconModule, MatTooltipModule],
  templateUrl: './carousel-strip.component.html',
  styleUrl: './carousel-strip.component.scss'
})
export class CarouselStripComponent {

  // Output EventEmitter to emit selected image path to parent component
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();

  // Input property to receive array of image paths from parent component
  @Input() images: string[] = [];

  // Index of currently selected image in the carousel
  selectedImageIndex = 0;

  // Method to select an image and emit its path to parent component
  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.imageSelected.emit(this.images[index]);
  }

  // Method to navigate through images (previous or next)
  navigate(direction: 'prev' | 'next') {
    const numImages = this.images.length;

    // Calculate new selectedImageIndex based on direction
    if (direction === 'prev') {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + numImages) % numImages;
    } else if (direction === 'next') {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % numImages;
    }

    // Emit the selected image path to parent component
    this.imageSelected.emit(this.images[this.selectedImageIndex]);
  }
}
