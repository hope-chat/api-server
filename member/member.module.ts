import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { TeenagerModule } from 'src/teenager/teenager.module';
import { ExpertModule } from 'src/expert/expert.module';
import { ManagerModule } from 'src/manager/manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), TeenagerModule, ExpertModule, ManagerModule, ChatModule],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}