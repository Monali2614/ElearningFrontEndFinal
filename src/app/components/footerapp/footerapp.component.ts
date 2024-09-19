import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footerapp',
  templateUrl: './footerapp.component.html',
  styleUrls: ['./footerapp.component.css']
})
export class FooterappComponent implements OnInit {

  careerForm: any = {
    name: '',
    email: '',
    contactNumber: '',
    workExperience: '',
    desiredDomain: ''
  };
  resumeFile: File | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  // Handle file input change
  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  // Submit career details
  submitCareerDetails() {
    const formData = new FormData();
    formData.append('name', this.careerForm.name);
    formData.append('email', this.careerForm.email);
    formData.append('contactNumber', this.careerForm.contactNumber);
    formData.append('workExperience', this.careerForm.workExperience);
    formData.append('desiredDomain', this.careerForm.desiredDomain);
    if (this.resumeFile) {
      formData.append('resume', this.resumeFile);
    }

    // Make HTTP POST request to save career details with responseType set to 'text'
    this.http.post('http://localhost:8080/carrer/savecareerdetails', formData, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Career details submitted successfully', response);
          alert('Career details submitted successfully');
        },
        error => {
          console.error('Error submitting career details', error);
          alert('There was an error submitting your details. Please try again.');
        }
      );
  }
}
