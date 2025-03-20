import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
 

// remember to import the validationpipe and use it
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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }
    // create user POST /users
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }
    // update user partially Patch /users/:id
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto);
    }
    // delete user DELETE /users/:id
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }
}
