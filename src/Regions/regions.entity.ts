import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, getRepository } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Departments } from '../Departments/departments.entity';

@Entity()
export class Regions extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  /*@OneToMany(type => Departments, departments => departments.region_code) // note: we will create author property in the Photo class below
  departments: Departments[];*/

  public static async findAll(): Promise<Regions[]> {
    const dept: Regions[] = await Regions.find();
    if (dept.length > 0) {
      return Promise.resolve(dept);
    } else {
      throw new AppError(AppErrorEnum.NO_REGIONS_IN_DB);
    }

  }

  public static async findRegionByName(regname): Promise<Regions[]> {

    const regs: Regions[] = await getRepository(Regions)
      .createQueryBuilder('regions')
      .where('regions.name like \''+regname+'\%\'')
      .getMany();
    if (regs.length > 0) {
      return Promise.resolve(regs);
    } else {
      throw new AppError(AppErrorEnum.NO_REGIONS_IN_RESULT);
    }

  }

}