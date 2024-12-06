import { Injectable } from '@nestjs/common';
import { Expert } from 'src/expert/entity/expert';
import { MemberService } from 'src/member/member.service';

@Injectable()
export class MemberManagementService {
  constructor(private readonly memberService: MemberService) {}

  async getUnauthorizedExperts(): Promise<Expert[]> {
    return await this.memberService.getUnauthorizedExperts();
  }

  async approveExpert(id: string) {
    this.memberService.approveExpert(id);
  }

  async getAuthorizedExperts(): Promise<Expert[]> {
    return await this.memberService.getAuthorizedExperts();
  }

  async getUnmatchedTeenagers() {
    return await this.memberService.getUnmatchedTeenagers();
  }

  async matchTeenager(teenID: string, expertID: string) {
    this.memberService.matchTeenager(teenID, expertID);
  }
}