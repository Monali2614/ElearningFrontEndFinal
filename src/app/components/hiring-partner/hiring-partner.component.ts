import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hiring-partner',
  templateUrl: './hiring-partner.component.html',
  styleUrls: ['./hiring-partner.component.css']
})
export class HiringPartnerComponent {

  isPlaying: boolean = false;
 
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
 
  togglePlay(): void {
    const video = this.videoPlayer.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
