import { Module } from '@nestjs/common';
import { ChatExpertService } from './chat-expert.service';
import { ChatService } from 'src/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatExpert } from './entity/chat-expert';

@Module({
  imports: [TypeOrmModule.forFeature([ChatExpert])],
  providers: [ChatExpertService],
  exports: [ChatExpertService]
})
export class ChatExpertModule {}