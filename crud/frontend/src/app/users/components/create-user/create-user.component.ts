import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { State } from '../../models/state.model';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, tap, first } from 'rxjs';
import { GetAddressDataResponse } from '../../models/get-address-data-response.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public form!: FormGroup;
  public user!: User;
  public states!: State[];
  public userId!: string;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getStates();
    this.setZipCodeSubscription();
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    this.usersService.getUserById(this.userId)
      .pipe(
        first()
      )
      .subscribe({
        next: (res) => {
          const user = res;
          this.form.patchValue(user);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  private buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      profession: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
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

  private setZipCodeSubscription(): void {
    this.form.get('address.zipCode')?.valueChanges
      .pipe(
        filter(value => value.length === 8),
        debounceTime(1000),
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next))
      )
      .subscribe((value) => {
        // if (value.length < 8) {
        //   return;
        // }
        this.getAddress(value);
      });
  }

  private getAddress(zipCode: string): void {
    this.usersService.getAddressByZipCode(zipCode)
      .pipe(
        map((response: GetAddressDataResponse) => {
          const address: Address = {
            street: response.logradouro,
            neighborhood: response.bairro,
            city: response.localidade,
            state: response.uf
          };

          return address;
        }),
        tap(response => {
          console.log(response)
          // this.form.get('address')?.patchValue(response);
        })
      )
      .subscribe((address: Address) => {
        console.log(address);
        this.form.get('address')?.patchValue(address);
      })
  }

  public onSubmit(): void {
    const user = this.form.getRawValue();

    if (this.userId) {
      this.usersService.editUser(user)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      this.usersService.saveUser(user)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }

    this.form.reset();
    this.router.navigate(['/users']);
  }

}
