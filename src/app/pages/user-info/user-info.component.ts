import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@yopmail.com',
    phone: '98563214'
  };

  userImage: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneCode: ['965'],
      phone: [''],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });

    this.authService.user$.subscribe((data) => {
      this.user = data;
      if (data) {
        this.profileForm.patchValue({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          phoneCode: data.phoneCode || '965',
          homeTown: data.homeTown || '',
          nationality: data.nationality || '',
          dob: data.dob || null,
          oldPassword: data.oldPassword || null,
          gender: data.gender || null
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }


  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    console.log(this.profileForm.value);
    alert('Profile updated!');
  }

  logout() {
    this.router.navigate(['/']);
  }

  showOldPassword: boolean = false;
  toggleOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  showNewPassword: boolean = false;
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  showConfirmPassword: boolean = false;
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
