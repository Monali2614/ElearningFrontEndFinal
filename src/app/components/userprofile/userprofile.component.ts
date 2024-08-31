import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  temp: boolean = false;


   profileDetails : Observable<User[]> | undefined;
  user: User = new User;
  msg = ' ';
  currRole = '';
   loggedUser = '';
   selectedFile: File | null = null;
   profileImage$: Observable<Blob> | undefined;
   email = this.user.email;
   imageData: string = '';
   selectedFileName: string | null = null;

 
  editingProfile: boolean = false; // Initialize editingProfile flag
   
   profileImageURL: string | undefined;
   // temp = false;

  constructor(private _service: UserService, private http: HttpClient,private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
   
    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails(this.loggedUser);
    this.loadProfileImage();
  }

  editProfile()
  {
    $("#profilecard").hide();
    $("#profileform").show();
    this.getProfileDetails(this.user.email);
    console.log(this.user);
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
    console.log(this.user);

  }

  updateUserProfile() {
    // Check if password and confirmPassword match
    if (this.user.password === this.user.confirmPassword) {
      // If they match, proceed with updating the profile
      this._service.UpdateUserProfile(this.user).subscribe(
        data => {
          console.log("UserProfile Updated successfully");
          this.msg = "Profile Updated Successfully !!!";
          $(".editbtn").hide();
          $("#message").show();
          this.temp = true;
          $("#profilecard").show();
          $("#profileform").hide();
          setTimeout(() => {
            this._router.navigate(['/userdashboard']);
          }, 6000);
        },
        error => {
          console.log("Profile Updation Failed");
          console.log(error.error);
          this.msg = "Profile Updation Failed !!!";
        }
      );
    } else {
      // If they don't match, display an error message
      this.msg = "Password and Confirm Password do not match!";
      alert(this.msg);
    }
  }
  

 
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
    }
  }

  onSubmit(email: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(this.user.email);
      this._service.postimage(email, formData).subscribe(
        data => {
          alert("Profile image uploaded successfully")
          console.log(email);
          console.log("Profile image uploaded successfully");
          this.msg = "Profile Updated Successfully !!!";
          $(".editbtn").hide();
          $("#message").show();
          this.temp = true;
          $("#profilecard").show();
          $("#profileform").hide();
          setTimeout(() => {
            this._router.navigate(['/userdashboard']);
          }, 6000);
        },
        error => {
          alert("Profile image uploaded successfully")
          console.log("emailid"+this.user.email);
          console.log("Profile image upload failed");
          console.log(error.error);
          this.msg = "Profile Image Upload Failed !!!";
        }
      );
    }
  }

  //--------------------------------------------------------------------------------------------
  loadProfileImage(): void {
    const userEmail = this.loggedUser;
    this.http.get(`http://localhost:8080/profile/getprofile/${userEmail}`, { responseType: 'blob' })
      .subscribe(
        response => this.createImageFromBlob(response),
        error => {
          console.error('Error fetching image:', error);
        }
      );
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageData = reader.result as string;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
