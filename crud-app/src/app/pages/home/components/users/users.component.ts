import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  userList: User[] = [];
  private usersSub: Subscription | null = null;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userList = this.userService.getUsersList();
    this.usersSub = this.userService.getUserUpdatedListener().subscribe(
      (users: User[]) => {
        this.userList = users;
      }
    );
  }

  editUser(userId: number) {
    console.log('Edit user clicked:', userId);
    this.router.navigate(['app/edit-user', userId]);
  }

  addNewUser() {
    this.router.navigate(['app/add-user']);
  }
   

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}