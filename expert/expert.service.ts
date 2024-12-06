import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Expert } from './entity/expert';
import { Assignment } from './entity/assignment';

@Injectable()
export class ExpertService {
  constructor (
    @InjectRepository(Expert) private expertRepository: Repository<Expert>,
    @InjectRepository(Assignment) private assignmentRepository: Repository<Assignment>,
  ) {}
  
  public async getInfo(id: string) {
    const expert: Expert = await this.expertRepository.findOne({where: {id}});
    return expert;
  }

  public async setInfo(data) {
    const id = data.id;
    const expert: Expert = await this.expertRepository.findOne({where: {id}});
    expert.name = data.name;
    expert.email = data.email;
    expert.institution = data.institution;
    return await this.expertRepository.save(expert);
  }
  
  public async delete(id: string) {
    const expert: Expert = await this.expertRepository.findOne({where: {id}});
    return await this.expertRepository.delete(expert);
  }
  
  public async signUp(data: Expert) {
    const {id, name, email, institution } = data;
    const expert: Expert = this.expertRepository.create({id, name, institution, email, approval: new Date()})
    return await this.expertRepository.save(expert);
  }

  public async getUnauthorizedExperts(): Promise<Expert[]> {
    const options: FindManyOptions<Expert> = {
      where: { approval: Not(IsNull()) }
    };

    const experts: Expert[] = await this.expertRepository.find(options);
    return experts;
  }

  public async approveExpert(id: string) {
    const expert: Expert = await this.expertRepository.findOne({where: {id}});
    if (expert) {
      expert.approval = null; // 특정 속성을 null로 설정
      const approveExpert = await this.expertRepository.save(expert); // 변경 사항 저장
    } else {
      // 엔터티를 찾지 못한 경우에 대한 처리
      console.log("Expert not found");
    }
  }

  public async getAuthorizedExperts(): Promise<Expert[]> {
    const options: FindManyOptions<Expert> = {
      where: { approval: IsNull() }
    };

    const experts: Expert[] = await this.expertRepository.find(options);
    return experts;
  }
  
  public async matchTeenager(teenID: string, expertID: string) {
    const assignment: Assignment = this.assignmentRepository.create({teen_id: teenID, expert_id: expertID})
    return await this.assignmentRepository.save(assignment);
  }

  public async getMyTeenagersID(expertID): Promise<Partial<Assignment>[]> {
    const options: FindManyOptions<Assignment> = {
      select: ['teen_id'],
      where: { expert_id: expertID }
    };

    const teenIDs: Partial<Assignment>[] = await this.assignmentRepository.find(options);
    return teenIDs;
  }
}