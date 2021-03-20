import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { Cities } from '../Cities/cities.entity';
import { JsonProperty } from 'json-typescript-mapper';

@Entity('expertise')
export class Expertise extends BaseEntity{
  @PrimaryGeneratedColumn()
  idExpertise: number;

  @Column({ length: 150 })
  libelle: string;
  @ManyToMany(type => Maquilleuse)
  @JoinTable()
  maquilleuses: Maquilleuse[];

  // @RelationId((photos: Photos) => photos.maquilleuse) // This is just to save the foreign key in this attribute.
//  maquilleuseId: number = undefined

  public static async findAll(): Promise<Expertise[]> {

    const expertises: Expertise[] = await Expertise.find();
    if (expertises.length > 0) {
      return Promise.resolve(expertises);
    } else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_DB);
    }

  }

  public static async findExpertiseById(idExpertise): Promise<Expertise> {
    const expertise: Expertise = await getRepository(Expertise)
      .createQueryBuilder('expertise')
      .where('expertise.idExpertise=' + idExpertise)
      .getOne();
    if (expertise != null) {
      return Promise.resolve(expertise);
    } else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_RESULT);
    }

  }

}