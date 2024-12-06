import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeenagerCareService } from './teenager-care.service';

@ApiTags('teenager-care')
@Controller('v1/care')
export class TeenagerCareController {
  constructor(private readonly teenagerCareService: TeenagerCareService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/teenagers')
  public async getTeenagers(@Body() dto: Record<string, any>) {
    return {teenagers: await this.teenagerCareService.getTeenagers(dto.id)};
  }

  @HttpCode(HttpStatus.OK)
  @Post('periodic-statistics')
  public async getPeriodicSentimentStatistics(@Body() dto: Record<string, any>) {
    return this.teenagerCareService.getPeriodicSentimentStatistics(dto.teenID, dto.startDate, dto.endDate);
  }

  @HttpCode(HttpStatus.OK)
  @Post('expert-chatting-history')
  public async getChattingHistoryWithExpert(@Body() dto: Record<string, any>) {
    return {history: await this.teenagerCareService.getChattingHistoryWithExpert(dto.teenID)};
  }
}