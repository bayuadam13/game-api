import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../../core/entities/score.entity';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule {}
