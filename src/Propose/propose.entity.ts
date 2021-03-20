import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Propose {
  @PrimaryGeneratedColumn()
  idPropose: number;

   @Column('int')
   idMaquilleuse: number;

   @Column('int')
   idPrestation: number;
}