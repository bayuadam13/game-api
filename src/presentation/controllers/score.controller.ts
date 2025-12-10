
import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubmitScoreUseCase } from '../../core/use-cases/submit-score.usecase';
import { GetLeaderboardUseCase } from '../../core/use-cases/get-leaderboard.usecase';

@Controller('scores')
export class ScoreController {
  constructor(
    private submitScore: SubmitScoreUseCase,
    private leaderboard: GetLeaderboardUseCase,
  ) {}

  @Post()
  submit(@Body() dto: any) {
    const fakeUser = { id: dto.userId, role: 'user' }; // placeholder
    return this.submitScore.execute(fakeUser, dto);
  }

  @Get('/leaderboard')
  getLeaderboard() {
    return this.leaderboard.execute();
  }
}
