
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ScoreRepository } from '../../infrastructure/repositories/score.repository';

@Injectable()
export class SubmitScoreUseCase {
  constructor(private scoreRepo: ScoreRepository) {}

  async execute(user: any, dto: any) {
    if (user.role !== 'admin' && user.id !== dto.userId) {
      throw new ForbiddenException('Not allowed');
    }
    return this.scoreRepo.createScore(dto);
  }
}
