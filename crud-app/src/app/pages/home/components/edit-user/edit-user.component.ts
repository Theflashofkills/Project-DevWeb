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
  users: User[] = [];
  userId: number | null = null;
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUsers();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.userId = id;
        this.loadUserData(id);
      }
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

  loadUsers() {
    this.users = this.userService.getUsersList().sort((a, b) => a.name.localeCompare(b.name));
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

  onUserSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const userId = parseInt(target.value, 10);
    if (!isNaN(userId)) {
      this.userId = userId;
      this.loadUserData(userId);
    }
  }

  updateUser() {
    if (this.userId === null) {
      console.error('User ID is not set');
      return;
    }
    const updatedUser: User = {
      id: this.userId,
      ...this.userForm.value
    };
    this.userService.updateUser(updatedUser);
    console.log('User edited:', updatedUser);
    this.router.navigate(['app/users']);
  }
}
