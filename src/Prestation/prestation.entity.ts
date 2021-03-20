import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestation {
  @PrimaryGeneratedColumn()
  idPrestation: number;

  @Column({ length: 50 })
  libelle: string;

  @Column()
  price: number;
}