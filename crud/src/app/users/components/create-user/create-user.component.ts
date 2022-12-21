import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public form!: FormGroup;
  public user!: User;
  public states!: State[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getStates();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [ Validators.required ]),
      profession: new FormControl(null, [ Validators.required ]),
      birthDate: new FormControl(null, [ Validators.required ]),
      documentNumber: new FormControl(null, [ Validators.required ]),
      address: new FormGroup({
        id: new FormControl(),
        zipCode: new FormControl(null, [ Validators.required ]),
        street: new FormControl(null, [ Validators.required ]),
        number: new FormControl(null, [ Validators.required ]),
        complement: new FormControl(),
        neighborhood: new FormControl(null, [ Validators.required ]),
        city: new FormControl(null, [ Validators.required ]),
        state: new FormControl(null, [ Validators.required ])
      }),
      contact: new FormGroup({
        phone: new FormControl(null, [ Validators.required ]),
        email: new FormControl(null, [ Validators.required ])
      })
    })
  }

  private getStates(): void {
    this.states = this.usersService.getStatesOfBrazil();
  }

  public onSubmit(): void {
    this.user = this.form.getRawValue();
    console.log(this.user)
  }

}
