import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatChatbot {
  @PrimaryGeneratedColumn('increment')
  key: number;

  @Column()
  teen_id: string;

  @Column()
  teen_message: string;

  @Column()
  teen_chat_date: Date;

  @Column()
  chatbot_message: string;

  @Column()
  chatbot_chat_date: Date;
}