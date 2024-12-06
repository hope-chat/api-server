import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeenagerChatService } from './teenager-chat.service';

@ApiTags('teenager-chat')
@Controller('v1/chat')
export class TeenagerChatController {
  constructor(private readonly teenagerChatService: TeenagerChatService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/chatbot-message')
  public async chatWithChatbot(@Body() dto: { id: string, teenMessage: string }): Promise<any> {
    const {botMessage, chatbotPreviousDate} = await this.teenagerChatService.chatWithChatbot(dto.id, dto.teenMessage)
    return { chatbot: botMessage, chatbotPreviousDate: chatbotPreviousDate};
  }

  @HttpCode(HttpStatus.OK)
  @Post('chatbot-historys')
  public async getChattingHistory(@Body() dto: Record<string, any>) {
    return { history: await this.teenagerChatService.getChattingHistoryWithChatbot(dto.id)};
  }

  @HttpCode(HttpStatus.OK)
  @Post('chatbot-historys-period')
  public async getChattingHistoryPeriod(@Body() dto: Record<string, any>) {
    return { history: await this.teenagerChatService.getChattingHistoryWithChatbotPeriod(dto.id, dto.startDate, dto.endDate)};
  }
}