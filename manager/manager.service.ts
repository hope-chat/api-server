import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entity/manager';

@Injectable()
export class ManagerService {
  constructor (
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
  ) {}
    
  public async signUp(data: Manager) {
    const {id, name} = data;
    const manager: Manager = this.managerRepository.create({id, name})
    return await this.managerRepository.save(manager);
  } 
}