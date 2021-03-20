import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({name: 'users'})
export class Candidat extends BaseEntity {
  @PrimaryGeneratedColumn()
  idCandidat: number;

  @Column({ length: 50 })
  nom: string;

  @Column({ length: 50 })
  prenom: string;

  @Column({ length: 30 })
  username: string;
}