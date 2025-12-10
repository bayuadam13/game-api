import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    if (!body.username || !body.password) throw new BadRequestException('username & password required');
    const existing = await this.usersService.findByUsername(body.username);
    if (existing) throw new BadRequestException('username exists');
    const user = await this.usersService.create(body.username, body.password);
    const { password, ...rest } = user as any;
    return rest;
  }
}
