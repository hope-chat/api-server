import { Module } from '@nestjs/common';
import { TeenagerCareService } from './teenager-care.service';
import { MemberModule } from 'src/member/member.module';
import { ChatModule } from 'src/chat/chat.module';
import { TeenagerCareController } from './teenager-care.controller';

@Module({
  imports: [MemberModule, ChatModule],
  providers: [TeenagerCareService],
  controllers: [TeenagerCareController]
})
export class TeenagerCareModule {}