import { Module } from '@nestjs/common';
import { TeenagerChatService } from './teenager-chat.service';
import { ChatModule } from 'src/chat/chat.module';
import { TeenagerChatController } from './teenager-chat.controller';

@Module({
  imports: [ChatModule],
  providers: [TeenagerChatService],
  controllers: [TeenagerChatController]
})
export class TeenagerChatModule {}