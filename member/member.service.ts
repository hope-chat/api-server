import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entity/member';
import { TeenagerService } from 'src/teenager/teenager.service';
import { ExpertService } from 'src/expert/expert.service';
import { Teenager } from 'src/teenager/entity/teenager';
import { MemberRole } from './member-type';
import { Expert } from 'src/expert/entity/expert';
import { Manager } from 'src/manager/entity/manager';
import { ManagerService } from 'src/manager/manager.service';
import { Assignment } from 'src/expert/entity/assignment';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MemberService {
  constructor (
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly teenagerService: TeenagerService,
    private readonly expertService: ExpertService,
    private readonly managerService: ManagerService,
    private readonly chatService: ChatService,
  ) {}

  public async signIn(id: string, pw: string): Promise<{ access_token: string, role: string }> {
    const member = await this.memberRepository.findOne( { where: { id, pw } } );

    const role: MemberRole = member.role;
    let roleString = "";
    
    switch (role) {
      case MemberRole.TEENAGER: 
        roleString = "teenager";
        break;
      case MemberRole.EXPERT: 
        roleString = "expert";
        break;
      case MemberRole.MANAGER: 
        roleString = "manager";
        break;
      default: 
        break;
    }

    return {
      access_token: 'jwt',
      role: roleString
    };
  }

  public async getTeenagerInfo(id: string) {
    return await this.teenagerService.getInfo(id);
  }

  public async getExpertInfo(id: string) {
    return await this.expertService.getInfo(id);
  }

  public async setMemberInfo(data) {
    const id = data.id;
    const member: Member = await this.memberRepository.findOne({where: {id}});
    member.pw = data.pw;
    await this.memberRepository.save(member);
  }

  public async setTeenagerInfo(data) {
    this.setMemberInfo(data);
    return await this.teenagerService.setInfo(data);
  }

  public async setExpertInfo(data) {
    this.setMemberInfo(data);
    return await this.expertService.setInfo(data);
  }
  
  public async delete(id: string, pw: string, role: string) {
    const member: Member = await this.memberRepository.findOne({where: {id, pw}});
    if (role === 'teenager' && member) {
      this.teenagerService.delete(id);
    } else {
      this.expertService.delete(id);
    }
    return await this.memberRepository.delete(member);
  }
  
  public async teenagerSignUp(data: Teenager & Member) {
    this.teenagerService.signUp(data);
    const {id, pw} = data;
    const member: Member = this.memberRepository.create({id, pw, role:MemberRole.TEENAGER});
    return await this.memberRepository.save(member);
  }
   
  public async expertSignUp(data: Expert & Member) {
    this.expertService.signUp(data);
    const {id, pw} = data;
    const member: Member = this.memberRepository.create({id, pw, role:MemberRole.EXPERT});
    return await this.memberRepository.save(member);
  }

  public async managerSignUp(data: Manager & Member) {
    this.managerService.signUp(data);
    const {id, pw} = data;
    const member: Member = this.memberRepository.create({id, pw, role:MemberRole.MANAGER});
    return await this.memberRepository.save(member);
  }

  public async getUnauthorizedExperts(): Promise<Expert[]> {
    return await this.expertService.getUnauthorizedExperts();
  }

  public async approveExpert(id: string) {
    this.expertService.approveExpert(id);
  }

  public async getAuthorizedExperts(): Promise<Expert[]> {
    return await this.expertService.getAuthorizedExperts();
  }

  public async getUnmatchedTeenagers() {
    const teenagers = await this.teenagerService.getUnmatchedTeenagers();
    const teenagersWithNegativeSentimentPercentage = [];
    for(var teenager of teenagers) {
      const teenagerWithPercentage = {...teenager, percentage: await this.chatService.getNegativeSentimentPercentage(teenager.id)};
      teenagersWithNegativeSentimentPercentage.push(teenagerWithPercentage);
    }

    return teenagersWithNegativeSentimentPercentage;
  }

  public async matchTeenager(teenID: string, expertID: string) {
    this.expertService.matchTeenager(teenID, expertID);
    this.teenagerService.matchExpert(teenID);
  }

  public async getTeenagers(id: string) {
    const assignment: Partial<Assignment>[] = await this.expertService.getMyTeenagersID(id);
    const teensData = [];

    for (const teen of assignment)
      teensData.push(await this.teenagerService.getInfo(teen.teen_id));
    
    return teensData;
  }
}