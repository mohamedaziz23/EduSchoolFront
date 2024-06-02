import { Component } from '@angular/core';
import { User, UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
 users: User[] = [];
  error: string | null = null;

  constructor(private  userservice: UserService) {}

  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        this.error = 'Failed to load users';
        console.error('There was an error!', error);
      }
    );
  }
}
