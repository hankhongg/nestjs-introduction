import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    // find all users GET /users
    @Get()
    findAll(){
        return 'This action returns all users';
    }
    // find user by id GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return {id};
    }
    // create user POST /users
    @Post()
    create(@Body() user: {}){
        return user;
    }
    // update user partially Patch /users/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}){
        return {id, ...user};
    }
    // delete user DELETE /users/:id
    @Delete(':id')
    delete(@Param('id') id: string){
        return `This action removes a #${id} user`;
    }
}
