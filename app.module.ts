import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MemberManagementModule } from './member-management/member-management.module';
import { TeenagerCareModule } from './teenager-care/teenager-care.module';
import { TeenagerChatModule } from './teenager-chat/teenager-chat.module';
import { MemberModule } from './member/member.module';
import { ChatModule } from './chat/chat.module';
import { TeenagerModule } from './teenager/teenager.module';
import { ExpertModule } from './expert/expert.module';
import { ManagerModule } from './manager/manager.module';
import { AnalysisSentimentModule } from './analysis-sentiment/analysis-sentiment.module';
import { ChatChatbotModule } from './chat-chatbot/chat-chatbot.module';
import { ChatExpertModule } from './chat-expert/chat-expert.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentimentStatistics } from './analysis-sentiment/entity/sentiment-statistics';
import { ChatChatbot } from './chat-chatbot/entity/chat-chatbot';
import { ChatExpert } from './chat-expert/entity/chat-expert';
import { Assignment } from './expert/entity/assignment';
import { Expert } from './expert/entity/expert';
import { Manager } from './manager/entity/manager';
import { Member } from './member/entity/member';
import { Teenager } from './teenager/entity/teenager';
const secretConfig = require('../secret_config.js')

@Module({
  imports: [AuthModule, MemberManagementModule, TeenagerCareModule, TeenagerChatModule, MemberModule, ChatModule, TeenagerModule, ExpertModule, ManagerModule, AnalysisSentimentModule, ChatChatbotModule, ChatExpertModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: secretConfig.USER,
      password: secretConfig.PASSWORD,
      database: secretConfig.TEMP_PROJECT_DB3,
      entities: [SentimentStatistics, ChatChatbot, ChatExpert, Assignment, Expert, Manager, Member, Teenager],
      synchronize: true,
    }),
  ],
})
export class AppModule {}