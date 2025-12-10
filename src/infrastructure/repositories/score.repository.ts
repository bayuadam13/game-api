
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../../core/entities/score.entity';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectRepository(Score)
    private repo: Repository<Score>,
  ) {}

  createScore(data: Partial<Score>) {
    return this.repo.save(data);
  }

  getLeaderboard() {
    return this.repo.find({
      order: { score: 'DESC' },
      take: 10,
      relations: ['user']
    });
  }
}
