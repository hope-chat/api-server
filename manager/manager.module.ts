import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entity/manager';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}