import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { Solved } from '../solved/entities/solved.entity';
import { User } from '../users/entities/user.entity';
import { Problem } from './entities/problem.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Problem, Solved, User])],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService],
})
export class ProblemModule {}
