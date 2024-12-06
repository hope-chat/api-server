import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class TeenagerChatService {
  constructor (private readonly chatService: ChatService) {}

  public async chatWithChatbot(id: string, teenMessage: string): Promise<any> {
    return await this.chatService.chatWithChatbot(id, teenMessage);
  }

  public async getChattingHistoryWithChatbot(teenID: string) {
    return await this.chatService.getChattingHistoryWithChatbot(teenID);
  }
  
  public async getChattingHistoryWithChatbotPeriod(teenID: string, startDate: string, endDate: string) {
    return await this.chatService.getChattingHistoryPeriod(teenID, startDate, endDate);
  }
}