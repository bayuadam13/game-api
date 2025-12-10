import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(username: string, password: string, role: 'user'|'admin' = 'user') {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed, role });
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }

  async findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async ensureAdmin(username: string, password: string) {
    if (!username || !password) return;
    const ex = await this.findByUsername(username);
    if (!ex) {
      await this.create(username, password, 'admin');
      console.log('Admin user created:', username);
    } else if (ex.role !== 'admin') {
      ex.role = 'admin';
      await this.usersRepo.save(ex);
      console.log('User promoted to admin:', username);
    }
  }
}
