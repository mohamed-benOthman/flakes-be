import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { Cities } from '../Cities/cities.entity';
import { JsonProperty } from 'json-typescript-mapper';

@Entity('business')
export class Business extends BaseEntity{
  @PrimaryGeneratedColumn()
  idBusiness: number;

  @Column({ length: 150 })
  libelle: string;
  @ManyToMany(type => Maquilleuse)
  @JoinTable()
  maquilleuses: Maquilleuse[];

  // @RelationId((photos: Photos) => photos.maquilleuse) // This is just to save the foreign key in this attribute.
//  maquilleuseId: number = undefined

  public static async findAll(): Promise<Business[]> {

    const business: Business[] = await Business.find();
    if (business.length > 0) {
      return Promise.resolve(business);
    } else {
      throw new AppError(AppErrorEnum.NO_BUSINESS_IN_DB);
    }

  }

  public static async findBusinessById(idBusiness): Promise<Business> {
    const business: Business = await getRepository(Business)
      .createQueryBuilder('business')
      .where('business.idBusiness=' + idBusiness)
      .getOne();
    if (business != null) {
      return Promise.resolve(business);
    } else {
      throw new AppError(AppErrorEnum.NO_BUSINESS_IN_RESULT);
    }

  }

}