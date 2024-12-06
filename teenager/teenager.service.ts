import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teenager } from './entity/teenager';

@Injectable()
export class TeenagerService {
  constructor (
    @InjectRepository(Teenager) private teenagerRepository: Repository<Teenager>,
  ) {}

  public async getInfo(id: string): Promise<Teenager> {
    const teenager: Teenager = await this.teenagerRepository.findOne({where: {id}});
    return teenager;
  }

  public async setInfo(data) {
    // console.log(data)
    const id = data.id;
    const teenager: Teenager = await this.teenagerRepository.findOne({where: {id}});
    teenager.name = data.name;
    teenager.age = data.age;
    teenager.address = data.address;
    teenager.gender = data.gender;
    teenager.phone_num = data.phone_num;
    return await this.teenagerRepository.save(teenager);
  }
  
  public async delete(id: string) {
    const teenager: Teenager = await this.teenagerRepository.findOne({where: {id}});
    return await this.teenagerRepository.delete(teenager);
  }
  
  public async signUp(data: Teenager) {
    const {id, name, age, address, gender, phone_num, assignments} = data;
    const teenager: Teenager = this.teenagerRepository.create({id, name, age, address, gender, phone_num, assignments})
    return await this.teenagerRepository.save(teenager);
  } 

  public async getUnmatchedTeenagers() {
    const teenagers = await this.teenagerRepository.find({where: {assignments: 0}});
    return teenagers;
  }

  public async matchExpert(teenID: string) {
    const teenager = await this.teenagerRepository.findOne({where: {id: teenID}});
    teenager.assignments++;
    this.teenagerRepository.save(teenager)
  }
}