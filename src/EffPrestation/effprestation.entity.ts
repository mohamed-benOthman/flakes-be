import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EffPrestation {
 @PrimaryGeneratedColumn()
  idEffPrestation: number;

  @Column('int')
  idClient: number;

   @Column('int')
  idMaquilleuse: number;

   @Column('int')
  idPrestation: number;

  @Column('int')
  idStatut: number;

  @Column('datetime')
  date: Date;
}