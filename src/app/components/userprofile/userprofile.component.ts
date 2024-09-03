import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'jquery';
import { Observable, observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  temp: boolean = false;
  user: User = new User();
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imageData: string = '';
  userEmail: string | null = null;
  editingProfile: boolean = false;

  constructor(
    private _service: UserService,
    private http: HttpClient,
    private _router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();
    
    if (this.userEmail) {
      this._service.getUserByEmail(this.userEmail).subscribe(
        data => this.user = data,
        error => console.error(error)
      );
      this.loadUserProfile();
    } else {
      console.log("No email found for the current user");
    }
  }

  editProfile(): void {
    this.editingProfile = true;
  }

  updateUserProfile(): void {
    this._service.UpdateUserProfile(this.user).subscribe(
      () => {
        this.temp = true;
        this._router.navigate(['/userdashboard']);
      },
      error => {
        console.error("Profile Updation Failed", error);
        this.temp = false;
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  uploadProfileImage(): void {
    if (this.selectedFile && this.userEmail) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post(`http://localhost:8080/api/profile/uploadimage/${this.userEmail}`, formData, {
        responseType: 'text'
      }).subscribe(
        response => {
          console.log(response);
          alert('Profile image uploaded successfully!');
        },
        error => {
          console.error(error);
          alert('Failed to upload profile image.');
        }
      );
    } else {
      alert('No file selected or user email not available.');
    }
  }

  loadUserProfile(): void {
    if (this.userEmail) {
      this._service.getUserImage(this.userEmail).subscribe(data => {
        this.imageData = `data:image/jpeg;base64,${data}`;
      });
    }
  }
}
