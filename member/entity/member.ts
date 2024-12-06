import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryColumn()
  id: string;

   @Column()
   pw: string;

   @Column()
   role: number;
}