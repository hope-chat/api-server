import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatChatbot } from './entity/chat-chatbot';
const util = require('../../util.js')
const config = require('../../config.js')

@Injectable()
export class ChatChatbotService {
  constructor (
    @InjectRepository(ChatChatbot) private chatChatbotRepository: Repository<ChatChatbot>,
  ) {}

  public async chatWithChatbot(id: string, teenMessage: string) {
    var chatbotPreviousDate = new Date();
    var now = new Date();
    var utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); 

    var koreaTimeDiff = 9 * 60 * 60 * 1000; 
    var koreaNow = new Date(utcNow + koreaTimeDiff);
    chatbotPreviousDate = koreaNow;

    const chattingHistory: ChatChatbot[] = await this.chatChatbotRepository.find({where: {teen_id: id}});
    const chattingMessage: string[] = [];
    for (const chatting of chattingHistory) {
      chattingMessage.push(chatting.teen_message);
    }
    console.log(chattingMessage);
    const botMessage = (await this.requestAiMessage(teenMessage, chattingMessage)).bot;

    var chatbot_chat_date = new Date();
    now = new Date(); 
    utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); 

    koreaTimeDiff = 9 * 60 * 60 * 1000; 
    koreaNow = new Date(utcNow + koreaTimeDiff);
    chatbot_chat_date = koreaNow;  
    
    const chatting = this.chatChatbotRepository.create({
      teen_id: id, 
      teen_message: teenMessage, 
      teen_chat_date: chatbotPreviousDate, 
      chatbot_message: botMessage, 
      chatbot_chat_date, 
    });

    await this.chatChatbotRepository.save(chatting);
    return {botMessage, chatbotPreviousDate};
  }

  public async getChattingHistoryWithChatbot(teenID: string) {
    const chattingHistory: ChatChatbot[] = await this.chatChatbotRepository.find({where: {teen_id: teenID}});
    return chattingHistory;
  }
  
  public async getChattingHistoryPeriod(teenID: string, startDate: string, endDate: string) {
    const chattingHistory: ChatChatbot[] = await this.chatChatbotRepository.find({where: {teen_id: teenID}});
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const extractedData = chattingHistory
      .filter(({ teen_chat_date }) => teen_chat_date >= parsedStartDate && teen_chat_date <= parsedEndDate);
    return extractedData;
  }

  private async requestAiMessage(childMessage, previousMessage) {
    return util.makeHttpRequest(config.URL_CHATBOT_SERVER, { 'Content-Type': 'application/json' }, { child: childMessage, previousMessage });
  }
}