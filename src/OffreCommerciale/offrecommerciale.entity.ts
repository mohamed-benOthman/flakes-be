import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class OffreCommerciale extends  BaseEntity{
  @PrimaryGeneratedColumn()
  idOffre: number;

  @Column({ length: 100 })
  libelle: string;

  @Column({ length: 10 })
  price: string;

  @Column()
  isfree: boolean;

  public static async findById(id: number): Promise<OffreCommerciale>{
    const offre = await OffreCommerciale.findOne({idOffre: id});
    return offre;
  }

}
