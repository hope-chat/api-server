import { Module } from '@nestjs/common';
import { ChatChatbotService } from './chat-chatbot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChatbot } from './entity/chat-chatbot';

@Module({
  imports: [TypeOrmModule.forFeature([ChatChatbot])],
  providers: [ChatChatbotService],
  exports: [ChatChatbotService]
})
export class ChatChatbotModule {}