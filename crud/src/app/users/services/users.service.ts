import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

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

  public getUsers(): User[] {
    return JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public saveUser(user: User): void {
    user = {
      ...user,
      id: crypto.randomUUID(),
      address: {
        ...user.address,
        id: crypto.randomUUID()
      }
    }

    const users = this.getUsers();

    users.push(user);
    this.setLocalSorageData(users);
  }

  public getUserById(id: string): User {
    const users = this.getUsers();
    return users.find(user => user.id === id) as User;
  }

  public deleteUser(id: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    users.splice(userIndex, 1);
    this.setLocalSorageData(users);
  }

  public editUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    this.setLocalSorageData(users);
  }

  private setLocalSorageData(data: User[]): void {
    localStorage.setItem('USERS', JSON.stringify(data));
  }
}
