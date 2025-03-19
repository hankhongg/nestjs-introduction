import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'John Doe', email: "john@gmailcom", role: 'EMPLOYEE'},
        {id: 2, name: 'Jane Doe', email: "jane@gmailcom", role: 'INTERN'},
        {id: 3, name: 'Jim Doe', email: "jim@gmailcom", role: 'EMPLOYEE'},
        {id: 4, name: 'Jill Doe', email: "jill@gmailcom", role: 'INTERN'},
        {id: 5, name: 'Jack Doe', email: "jack@gmailcom", role: 'EMPLOYEE'},
    ];
    findAll(role?: 'INTERN' | 'EMPLOYEE'){
        if (role){
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }
    findOne(id: string) {
        return this.users.filter(user => user.id === +id);
    }
    create(user: {name: string, email: string, role: 'INTERN' | 'EMPLOYEE'}){
        const sortedUsersById = [...this.users].sort((a,b)=> b.id - a.id) // spread the array so i wont mutate the original array
        const highestId = sortedUsersById[0].id;
        const newUser = {id: highestId + 1, ...user};
        this.users.push(newUser);
        return newUser;
    }
    update(id: string, updatedUser: {name: string, email: string, role: 'INTERN' | 'EMPLOYEE'}){
        // find the user
        // if exists update the user
        // if not return the old one
        this.users = [...this.users].map((user, i) => {
            if (user.id === +id){
                return {...user, ...updatedUser};
                
            }
            return user;
        });
        return this.findOne(id);
    }
    delete(id: string){
        return this.users = this.users.filter(user => user.id !== +id);
        
    }
}
