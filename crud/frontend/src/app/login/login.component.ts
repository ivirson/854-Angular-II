import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKeysEnum } from '../core/constants/local-storage-keys.enum';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onSubmit(): void {
    const payload = this.form.getRawValue();
    this.loginService.login(payload)
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem(LocalStorageKeysEnum.USER_TOKEN, res.token);
          localStorage.setItem(LocalStorageKeysEnum.USER, JSON.stringify(res.user));
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

}
