import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entity/assignment';
import { Expert } from './entity/expert';

@Module({
  imports: [TypeOrmModule.forFeature([Expert, Assignment])],
  providers: [ExpertService],
  exports: [ExpertService]
})
export class ExpertModule {}