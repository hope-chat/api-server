import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SentimentStatistics {
  @PrimaryGeneratedColumn('increment')
  key: number;

  @Column()
  id: string;

  @Column()
  sentence: string;

  @Column()
  sentiment: string;

  @Column()
  accuracy: number;

  @Column()
  date: Date;
}