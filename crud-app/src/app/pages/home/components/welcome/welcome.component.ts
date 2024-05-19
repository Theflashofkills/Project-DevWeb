import { Component } from '@angular/core';
import { UserService } from '../../.../../../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  totalUsers: number = 0;
  roleCounts: { [key: string]: number } = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.totalUsers = this.userService.getTotalUsersCount();
    this.roleCounts['Engenheiro de FE'] = this.userService.getUserCountByRole('Engenheiro de FE');
    this.roleCounts['Engenheiro de BE'] = this.userService.getUserCountByRole('Engenheiro de BE');
    this.roleCounts['Analista de dados'] = this.userService.getUserCountByRole('Analista de dados');
    this.roleCounts['Líder Técnico'] = this.userService.getUserCountByRole('Líder Técnico');
  }
}