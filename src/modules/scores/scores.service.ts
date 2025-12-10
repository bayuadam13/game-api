import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../../core/entities/score.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepo: Repository<Score>,
    private usersService: UsersService,
  ) {}

  async create(requester: any, value: number, userId?: number) {
    const targetUserId = userId || requester.userId;
    if (requester.role !== 'admin' && requester.userId !== targetUserId) {
      throw new ForbiddenException('Forbidden');
    }
    const user = await this.usersService.findById(targetUserId);
    if (!user) throw new NotFoundException('user not found');
    const score = this.scoresRepo.create({ value, userId: targetUserId });
    return this.scoresRepo.save(score);
  }

  async topTen() {
    return this.scoresRepo.find({
      order: { value: 'DESC' },
      take: 10,
      relations: ['user'],
    });
  }
}
