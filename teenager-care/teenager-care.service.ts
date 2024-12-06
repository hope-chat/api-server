import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { MemberService } from 'src/member/member.service';

@Injectable()
export class TeenagerCareService {
  constructor(
    private readonly memberService: MemberService, 
    private readonly chatService: ChatService
  ) {}

  public async getTeenagers(id: string) {
    const teenagers = await this.memberService.getTeenagers(id);
    const teenagersWithNegativeSentimentPercentage = [];
    for(var teenager of teenagers) {
      teenager = {...teenager, percentage: await this.chatService.getNegativeSentimentPercentage(teenager.id)};
      teenagersWithNegativeSentimentPercentage.push(teenager);
    }
    return teenagersWithNegativeSentimentPercentage;
  }

  public async getPeriodicSentimentStatistics(teenID: string, startDate: string, endDate: string) {
    return this.chatService.getPeriodicSentimentStatistics(teenID, startDate, endDate);
  }

  public async getChattingHistoryWithExpert(teenID: string) {
    return await this.chatService.getChattingHistoryWithExpert(teenID);
  }
}