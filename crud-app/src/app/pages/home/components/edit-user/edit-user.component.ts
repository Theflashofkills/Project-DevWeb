import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId: number = 0;
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData(this.userId);
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  loadUserData(userId: number) {
    this.user = this.userService.getUser(userId);
    if (this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        password: this.user.password
      });
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userId,
        ...this.userForm.value
      };
      this.userService.updateUser(updatedUser);
      console.log('User edited:', updatedUser);
      this.router.navigate(['app/users']);
    } else {
      console.error('Form is invalid');
    }
  }
}