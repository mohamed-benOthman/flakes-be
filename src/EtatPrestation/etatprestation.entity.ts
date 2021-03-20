import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EtatPrestation {
  @PrimaryGeneratedColumn()
  idClient: number;
  @Column({ length: 100 })
  libelle: string;

}