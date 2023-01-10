import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subject, take, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  public users!: User[];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers()
      .pipe(
        // take(1)
        // first()
        takeUntil(this.unsubscribe)
      )
      // .subscribe((users: User[]) => {
      //   this.users = users;
      // });
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (error: any) => {
          console.log('Error message:', error)
        },
        complete: () => {
          console.log('Finalizado!')
        }
      });
  }

  public editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
