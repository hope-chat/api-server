import { Injectable } from '@nestjs/common';
import { Expert } from 'src/expert/entity/expert';
import { Manager } from 'src/manager/entity/manager';
import { Member } from 'src/member/entity/member';
import { MemberRole } from 'src/member/member-type';
import { MemberService } from 'src/member/member.service';
import { Teenager } from 'src/teenager/entity/teenager';

@Injectable()
export class AuthService {
  constructor(private readonly memberService: MemberService) {}

  public async signIn(id: string, pw: string): Promise<{ access_token: string, role: string }> {
    return await this.memberService.signIn(id, pw);
  }

  public async getTeenagerInfo(id: string) {
    return await this.memberService.getTeenagerInfo(id)
  }

  public async getExpertInfo(id: string) {
    return await this.memberService.getExpertInfo(id)
  }

  public async setTeenagerInfo(data) {
    return await this.memberService.setTeenagerInfo(data)
  }

  public async setExpertInfo(data) {
    return await this.memberService.setExpertInfo(data)
  }
  
  public async delete(id: string, pw: string, role: string) {
    return await this.memberService.delete(id, pw, role)
  }
  
  public async teenagerSignUp(data: Teenager & Member) {
    this.memberService.teenagerSignUp(data)
  }
   
  public async expertSignUp(data: Expert & Member) {
    this.memberService.expertSignUp(data)
  }

  public async managerSignUp(data: Manager & Member) {
    this.memberService.managerSignUp(data)
  }
}