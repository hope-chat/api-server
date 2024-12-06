import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AnalysisSentimentModule } from 'src/analysis-sentiment/analysis-sentiment.module';
import { ChatChatbotModule } from 'src/chat-chatbot/chat-chatbot.module';
import { ChatExpertModule } from 'src/chat-expert/chat-expert.module';

@Module({
  providers: [ChatService],
  exports: [ChatService],
  imports: [AnalysisSentimentModule, ChatChatbotModule, ChatExpertModule]
})
export class ChatModule {}