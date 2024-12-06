import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teenager {
  @PrimaryGeneratedColumn('increment')
  key: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  phone_num: string;

  @Column()
  assignments: number;
}