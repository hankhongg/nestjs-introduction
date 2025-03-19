import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

// gotta import the service AND put it in the constructor as a bean aka dependency injection
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // find all users GET /users [can use query to filter the roles] // http://localhost:3000/users?role=INTERN
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE'){
        return this.usersService.findAll(role);
    }
    // find user by id GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    // create user POST /users
    @Post()
    create(@Body() user: {name: string, email: string, role: 'INTERN' | 'EMPLOYEE'}){
        return this.usersService.create(user);
    }
    // update user partially Patch /users/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {name: string, email: string, role: 'INTERN' | 'EMPLOYEE'}){
        return this.usersService.update(id, user);
    }
    // delete user DELETE /users/:id
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.usersService.delete(id);
    }
}
