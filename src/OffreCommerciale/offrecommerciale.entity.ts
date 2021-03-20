import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OffreCommerciale {
  @PrimaryGeneratedColumn()
  idOffre: number;

  @Column({ length: 100 })
  libelle: string;

  @Column()
  price: number;

  @Column()
  isfree: boolean;

}