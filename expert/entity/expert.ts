import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expert {
  @PrimaryGeneratedColumn('increment')
  key: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  institution: string;

  @Column({ nullable: true })
  approval: Date | null;
}