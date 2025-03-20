import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
            const allUser = this.users.filter(user => user.role === role);
            if (!allUser.length) throw new NotFoundException(`No ${role} found`);
            return allUser;
        }
        return this.users;
    }
    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (user) return user
        else throw new NotFoundException(`User with id ${id} not found`);
    }
    create(createUserDto: CreateUserDto){
        const sortedUsersById = [...this.users].sort((a,b)=> b.id - a.id) // spread the array so i wont mutate the original array
        const highestId = sortedUsersById[0].id;
        const newUser = {id: highestId + 1, ...createUserDto};
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, updateUserDto: UpdateUserDto){
        // find the user
        // if exists update the user
        // if not return the old one
        this.users = [...this.users].map((user, i) => {
            if (user.id === +id){
                return {...user, ...updateUserDto};
                
            }
            return user;
        });
        return this.findOne(id);
    }
    delete(id: number){
        return this.users = this.users.filter(user => user.id !== id);
        
    }
}
