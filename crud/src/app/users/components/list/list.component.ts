import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users!: User[];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.users = this.usersService.getUsers();
  }

  public editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
    this.getUsers();
  }
}
