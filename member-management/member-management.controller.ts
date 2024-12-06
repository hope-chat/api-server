import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemberManagementService } from './member-management.service';
import { Expert } from 'src/expert/entity/expert';

@Controller('v1/manager')
export class MemberManagementController {
  constructor (private readonly memberManageMentService: MemberManagementService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('/unauthorized-experts')
  async getUnauthorizedExperts(@Body() dto: Record<string, any>): Promise<{experts: Expert[]}> {
    return { experts: await this.memberManageMentService.getUnauthorizedExperts()};
  }

  @Post('/approve-expert')
  async approveExpert(@Body() dto: Record<string, any>) {
    return {result: this.memberManageMentService.approveExpert(dto.id)};
  }

  @Post('/authorized-experts')
  async getAuthorizedExperts(@Body() dto: Record<string, any>) {
    return { authorizedExperts: await this.memberManageMentService.getAuthorizedExperts() };
  }

  @Post('/get-unmatched-teenagers')
  async getUnmatchedTeenagers(@Body() dto: Record<string, any>) {
    return {teenagers: await this.memberManageMentService.getUnmatchedTeenagers()};
  }

  @Post('/match-teenager')
  async matchTeenager(@Body() dto: Record<string, any>) {
    return {result: this.memberManageMentService.matchTeenager(dto.teenID, dto.expertID)};
  }
}