import { Injectable } from '@nestjs/common';
import { AnalysisSentimentService } from 'src/analysis-sentiment/analysis-sentiment.service';
import { ChatChatbotService } from 'src/chat-chatbot/chat-chatbot.service';
import { ChatExpertService } from 'src/chat-expert/chat-expert.service';

@Injectable()
export class ChatService {
  constructor (
    private readonly analysisSentimentService: AnalysisSentimentService, 
    private readonly chatChatbotService: ChatChatbotService,
    private readonly chatExpertService: ChatExpertService,
  ) {}

  public async getNegativeSentimentPercentage(teenID: string) {
    return await this.analysisSentimentService.getNegativeSentimentPercentage(teenID);
  }

  public async getPeriodicSentimentStatistics(teenID: string, startDate: string, endDate: string) {
    return this.analysisSentimentService.getPeriodicSentimentStatistics(teenID, startDate, endDate);
  }

  public async getChattingHistoryWithExpert(teenID: string) {
    return await this.chatExpertService.getChattingHistoryWithExpert(teenID);
  }
  
  public async chatWithChatbot(id: string, teenMessage: string): Promise<any> {
    // 1) 챗봇 서비스와 통신하여 챗봇의 메시지를 가져오기
    const {botMessage, chatbotPreviousDate} = await this.chatChatbotService.chatWithChatbot(id, teenMessage);

    // 2) 감정 분석 서비스와 통신하여 감정 분석 결과 저장하기
    this.analysisSentimentService.storeAnalysis(id, teenMessage);

    return {botMessage, chatbotPreviousDate};
  }

  public async getChattingHistoryWithChatbot(teenID: string) {
    return await this.chatChatbotService.getChattingHistoryWithChatbot(teenID);
  }

  public async getChattingHistoryPeriod(teenID: string, startDate: string, endDate: string) {
    return await this.chatChatbotService.getChattingHistoryPeriod(teenID, startDate, endDate);
  }
}