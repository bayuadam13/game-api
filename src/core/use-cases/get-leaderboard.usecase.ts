
import { Injectable } from '@nestjs/common';
import { ScoreRepository } from '../../infrastructure/repositories/score.repository';

@Injectable()
export class GetLeaderboardUseCase {
  constructor(private scoreRepo: ScoreRepository) {}

  execute() {
    return this.scoreRepo.getLeaderboard();
  }
}
