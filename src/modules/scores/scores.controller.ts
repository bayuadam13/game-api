import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class ScoresController {
    constructor(private readonly scoresService: ScoresService) { }

    @UseGuards(AuthGuard('jwt'), ThrottlerGuard)
    // @Throttle(5, 60)
    @Post('scores')
    async submit(@Request() req, @Body() body: { score: number; userId?: number }) {
        const requester = req.user; // { userId, username, role }
        const result = await this.scoresService.create(requester, body.score, body.userId);
        return { id: result.id, userId: result.userId, score: result.value, createdAt: result.createdAt };
    }

    @Get('leaderboard')
    async leaderboard() {
        const rows = await this.scoresService.topTen();
        return rows.map(r => ({ username: r.user.username, score: r.value, createdAt: r.createdAt }));
    }
}
