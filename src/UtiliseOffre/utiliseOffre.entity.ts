import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UtiliseOffre {

  @PrimaryGeneratedColumn()
  idUtiliseOffre: number;

   @Column('int')
   idMaquilleuse: number;
  
   @Column('int')
   idOffre: number;

}