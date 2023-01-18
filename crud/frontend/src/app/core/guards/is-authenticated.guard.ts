import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageKeysEnum } from '../constants/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const token = localStorage.getItem(LocalStorageKeysEnum.USER_TOKEN);

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
