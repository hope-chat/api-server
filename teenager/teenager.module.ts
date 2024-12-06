import { Module } from '@nestjs/common';
import { TeenagerService } from './teenager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teenager } from './entity/teenager';

@Module({
  imports: [TypeOrmModule.forFeature([Teenager])],
  providers: [TeenagerService],
  exports: [TeenagerService]
})
export class TeenagerModule {}