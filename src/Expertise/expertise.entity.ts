import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { Cities } from '../Cities/cities.entity';
import { JsonProperty } from 'json-typescript-mapper';
import {ToolService} from '../common/tool/tool.service';

@Entity('expertise')
export class Expertise extends BaseEntity{
  @PrimaryGeneratedColumn()
  idExpertise: number;

  @Column({ length: 150 })
  libelle: string;

  @Column({ length: 150 })
  type: string;

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
  public static async deleteExpertise(id: number){
    console.log(id);
    const expertise: Expertise = await getRepository(Expertise)
        .createQueryBuilder('expertise')
        .where('expertise.idExpertise= \'' + id + '\'')
        .getOne();
    console.log(expertise);
    if (expertise != null){
      const deletedExpertise: Expertise = await Expertise.remove(expertise);
    }
    else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_DB);    }

  }
  public static async addExpertise(lebelle,type): Promise<Expertise>{

    const expertise: Expertise = await getRepository(Expertise)
        .createQueryBuilder('expertise')
        .where('expertise.libelle= \'' + lebelle + '\'')
        .getOne();
    if (expertise == null) {

      const newExpertise = Expertise.create();
      newExpertise.libelle = lebelle;
      newExpertise.type=type;
      await Expertise.save(newExpertise);
      return Promise.resolve(newExpertise);
    }
    else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_DB);
    }

  }
  public static async updateExpertise(expertise: Expertise): Promise<Expertise> {
    const oldExpertise: Expertise = await getRepository(Expertise)
        .createQueryBuilder('expertise')
        .where('expertise.idExpertise= \'' + expertise.idExpertise + '\'')
        .getOne();
    if (oldExpertise) {
      oldExpertise.idExpertise = parseInt(expertise.idExpertise);
      oldExpertise.libelle = expertise.libelle;

      await Expertise.save(oldExpertise);

    } else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_DB);
    }

  }

}
