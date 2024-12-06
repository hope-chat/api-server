import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('increment')
  key: number;

  @Column()
  teen_id: string;
  
  @Column()
  expert_id: string;
}