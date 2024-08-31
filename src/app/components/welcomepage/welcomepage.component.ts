import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { Course } from 'src/app/models/course';
import { ProfessorService } from 'src/app/services/professor.service';


@Component({

  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})

export class WelcomepageComponent implements OnInit {

  automationImageSrc: string = 'assets/img/Tech Brilliance_page-0009Copy.jpg';
  slideIndex: number = 0;
  autoSlideInterval: any;
  courses: Course[] = [];

  caaurses: any[] = [];
  

  constructor(private activatedRoute: ActivatedRoute, private _router: Router,
    private professorService: ProfessorService
  ) { }

  ngOnInit(): void {


   
    this.showSlide(this.slideIndex);
    this.startAutoSlide();

    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popover => {
      new bootstrap.Popover(popover);
    });
    $("#subtext1").click(function () {
      $("#innertext1").slideToggle(300);
      if ($('#innertext2').is(':visible') || $('#innertext3').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext2').slideUp(300);
        $('#innertext3').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext2").click(function () {
      $("#innertext2").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext3').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext3').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext3").click(function () {
      $("#innertext3").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext2').is(':visible') || $('#innertext4').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext2').slideUp(300);
        $('#innertext4').slideUp(300);
      }
    });
    $("#subtext4").click(function () {
      $("#innertext4").slideToggle(300);
      if ($('#innertext1').is(':visible') || $('#innertext2').is(':visible') || $('#innertext3').is(':visible')) {
        $('#innertext1').slideUp(300);
        $('#innertext2').slideUp(300);
        $('#innertext3').slideUp(300);
      }
    });

    this.fetchCourses();
    
  }

  fetchCourses(): void {
    this.professorService.getYoutubeCourseList().subscribe((youtubeCourses) => {
      this.courses = this.courses.concat(youtubeCourses);
    });

    this.professorService.getWebsiteCourseList().subscribe((websiteCourses) => {
      this.courses = this.courses.concat(websiteCourses);
    });

    this.professorService.getDriveCourseList().subscribe((driveCourses) => {
      this.courses = this.courses.concat(driveCourses);
    });
  }

  
  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  navigate() {
    this._router.navigate(['/login']);
  }


  changeImage(newImageUrl: string) {
    this.automationImageSrc = newImageUrl;
  }


  showSlide(index: number) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
      this.slideIndex = 0;
    } else if (index < 0) {
      this.slideIndex = totalSlides - 1;
    } else {
      this.slideIndex = index;
    }

    slides.forEach((slide, i) => {
      (slide as HTMLElement).style.transform = `translateX(${(i - this.slideIndex) * 100}%)`;
      (slide as HTMLElement).style.display = (i === this.slideIndex) ? 'block' : 'none';
    });
  }

  nextSlide() {
    this.showSlide(this.slideIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.slideIndex - 1);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 9000); // Change slide every 3 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  openTerms() {
    this._router.navigate(['/termcondition']);
  }
}


