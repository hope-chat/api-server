import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Teenager } from 'src/teenager/entity/teenager';
import { Member } from 'src/member/entity/member';
import { Expert } from 'src/expert/entity/expert';
import { MemberRole } from 'src/member/member-type';
import { Manager } from 'src/manager/entity/manager';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signIn')
  public async signIn(@Body() dto: Partial<Member>): Promise<{ access_token: string, role: string }> {
    return await this.authService.signIn(dto.id, dto.pw);
  }

  @HttpCode(HttpStatus.OK)
  @Post('teenager/info')
  public async getTeenagerInfo(@Body() dto: Record<string, any>): Promise<Teenager> {
    return await this.authService.getTeenagerInfo(dto.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('expert/info')
  public async getExpertInfo(@Body() dto: Record<string, any>) {
    return await this.authService.getExpertInfo(dto.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('teenager/set-Info')
  public async setTeenagerInfo(@Body() dto: Record<string, any>) {
    return await this.authService.setTeenagerInfo(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('expert/set-Info')
  public async setExpertInfo(@Body() dto: Record<string, any>) {
    return await this.authService.setExpertInfo(dto);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('delete')
  public async delete(@Body() dto: Record<string, any>) {
    return await this.authService.delete(dto.id, dto.pw, dto.role);
  }

  @HttpCode(HttpStatus.OK)
  @Post('teenager/signUp')
  public async teenagerSignUp(@Body() dto: Teenager & Member) {
    this.authService.teenagerSignUp(dto);
    return { result: "success" };
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('expert/signUp')
  public async expertSignUp(@Body() dto: Expert & Member) {
    this.authService.expertSignUp(dto);
    return { result: "success" };
  }

  @HttpCode(HttpStatus.OK)
  @Post('manager/signUp')
  public async managerSignUp(@Body() dto: Manager & Member) {
    this.authService.managerSignUp(dto);
    return { result: "success" };
  }
}