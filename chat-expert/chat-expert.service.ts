import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatExpert } from './entity/chat-expert';

@Injectable()
export class ChatExpertService {
  constructor (
    @InjectRepository(ChatExpert) private chatExpertRepository: Repository<ChatExpert>,
  ) {}
  
  public async getChattingHistoryWithExpert(teenID: string) {
    const history: ChatExpert[] = await this.chatExpertRepository.find({where: {room: teenID}});
    return history;
  } 
}