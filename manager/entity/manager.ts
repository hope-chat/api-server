import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('increment')
  key: number;
    
  @Column()
  id: string;

  @Column()
  name: string;
}