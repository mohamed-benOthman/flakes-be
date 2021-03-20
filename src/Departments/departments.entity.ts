import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Cities } from '../Cities/cities.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { JsonProperty } from 'json-typescript-mapper';
@Entity()
export class Departments extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 3 })
  region_code: string;
  @Column({ length: 3 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  /*@ManyToOne(type => Regions, regions => regions.departments)
  regions: Regions;*/

  @OneToMany(type => Cities, cities => cities.department_code, { cascade: true, eager: true }) // note: we will create author
  cities: Cities[];

  /* @OneToMany(type => Maquilleuse, maquilleuse => maquilleuse.department_code,{ cascade: true, eager: true }) // note: we will create author
maquilleuses: Maquilleuse[];*/

  @JsonProperty('maquilleuses')
  @OneToMany(type => Maquilleuse, maquilleuse => maquilleuse.citiesIdId)
  maquilleuses: Maquilleuse[];

  public static async findAll(): Promise<Departments[]> {

    const dept: Departments[] = await Departments.find();
    if (dept.length > 0) {
      return Promise.resolve(dept);
    } else {

      throw new AppError(AppErrorEnum.NO_DEPARTMENTS_IN_DB);
    }

  }

  public static async findDeptByName(deptname): Promise<Departments[]> {

    const sql = await getRepository(Departments)
      .createQueryBuilder('departments')
      .where('departments.name like \'' + deptname + '\%\'').getSql();
    console.log('entity name:' + deptname);

    console.log('requete:' + sql);

    const depts: Departments[] = await getRepository(Departments)
      .createQueryBuilder('departments')
      .where('departments.name like \'' + deptname + '\%\'')
      .getMany()
      .catch((err) => {
        console.log('Code Department error:'+AppErrorEnum.NO_DEPARTMENTS_IN_RESULT);
        console.error(err);
        throw new AppError(AppErrorEnum.NO_DEPARTMENTS_IN_RESULT);
      });




    if (depts.length > 0) {
      return Promise.resolve(depts);
    } else {
      console.log('Code Department error:'+AppErrorEnum.NO_DEPARTMENTS_IN_RESULT);
      throw new AppError(AppErrorEnum.NO_DEPARTMENTS_IN_RESULT);
    }

  }

}