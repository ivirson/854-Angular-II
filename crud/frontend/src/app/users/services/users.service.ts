import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { GetAddressDataResponse } from '../models/get-address-data-response.model';
import { State } from '../models/state.model';
import { UserResponse } from '../models/user-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getStatesOfBrazil(): State[] {
    return (
      [
        { name: 'Acre', abbr: 'AC' },
        { name: 'Alagoas', abbr: 'AL' },
        { name: 'Amapá', abbr: 'AP' },
        { name: 'Amazonas', abbr: 'AM' },
        { name: 'Bahia', abbr: 'BA' },
        { name: 'Ceará', abbr: 'CE' },
        { name: 'Distrito Federal', abbr: 'DF' },
        { name: 'Espírito Santo', abbr: 'ES' },
        { name: 'Goiás', abbr: 'GO' },
        { name: 'Maranhão', abbr: 'MA' },
        { name: 'Mato Grosso', abbr: 'MT' },
        { name: 'Mato Grosso do Sul', abbr: 'MS' },
        { name: 'Minas Gerais', abbr: 'MG' },
        { name: 'Pará', abbr: 'PA' },
        { name: 'Paraíba', abbr: 'PB' },
        { name: 'Paraná', abbr: 'PR' },
        { name: 'Pernambuco', abbr: 'PE' },
        { name: 'Piauí', abbr: 'PI' },
        { name: 'Rio de Janeiro', abbr: 'RJ' },
        { name: 'Rio Grande do Norte', abbr: 'RN' },
        { name: 'Rio Grande do Sul', abbr: 'RS' },
        { name: 'Rondônia', abbr: 'RO' },
        { name: 'Roraima', abbr: 'RR' },
        { name: 'Santa Catarina', abbr: 'SC' },
        { name: 'São Paulo', abbr: 'SP' },
        { name: 'Sergipe', abbr: 'SE' },
        { name: 'Tocantins', abbr: 'TO' }
      ]
    );
  }

  public getAddressByZipCode(zipCode: string): Observable<GetAddressDataResponse> {
    return this.http.get<GetAddressDataResponse>(`https://viacep.com.br/ws/${zipCode}/json/`)
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/users');
  }

  public saveUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('http://localhost:5000/users', user);
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:5000/users/${id}`);
  }

  public deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`http://localhost:5000/users/${id}`);
  }

  public editUser(user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(`http://localhost:5000/users/${user.id}`, user)
  }
}
