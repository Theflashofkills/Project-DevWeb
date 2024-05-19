import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Engenheiro de FE'],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  saveUser() {
    const newUser = this.userForm.value;
    this.userService.addUser(newUser);
    console.log('New user added:', newUser);
    this.userForm.reset();
  }
}