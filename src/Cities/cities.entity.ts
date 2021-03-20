import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, getRepository, OneToMany } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Departments } from '../Departments/departments.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { JsonProperty } from 'json-typescript-mapper';

@Entity('cities')
export class Cities extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  /*
    @Column({ length: 3 })
    department_code: string;*/

  @Column({ length: 5 })
  insee_code: string;

  @Column({ length: 5 })
  code: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  slug: string;

  @Column()
  gps_lat: number;

  @Column()
  gps_lng: number;


  @ManyToOne(type => Departments, departments => departments.cities, { nullable: false, onDelete: 'CASCADE' })
  public department_code: Departments;


  @JsonProperty('maquilleuses')
  @OneToMany(type => Maquilleuse, maquilleuse => maquilleuse.citiesIdId)
  maquilleuses: Maquilleuse[];
  public static async findAll(): Promise<Cities[]> {
    const cities: Cities[] = await Cities.find();
    if (cities.length > 0) {
      return Promise.resolve(cities);
    } else {
      throw new AppError(AppErrorEnum.NO_CITIES_IN_DB);
    }

  }
  public static async findCitiesByName(citiename, zipcode): Promise<Cities[]> {

    /* const sql = await getRepository(Departments)
       .createQueryBuilder('departments')
       .where('departments.name like \''+deptname+'\%\'').getSql();
     console.log('entity name:'+deptname);

     console.log('requete:'+sql);*/

    const cities: Cities[] = await getRepository(Cities)
      .createQueryBuilder('Cities')
      .where('cities.city like \'' + citiename + '\%\'')
      .getMany();
    if (cities.length > 0) {
      return Promise.resolve(cities);
    } else {
      const  citiesZip: Cities[] = await getRepository(Cities)
        .createQueryBuilder('Cities')
        .where('cities.code like \'' + zipcode + '\%\'')
        .getMany();

      if (citiesZip.length > 0) {
        return Promise.resolve(citiesZip);
      } else {
        throw new AppError(AppErrorEnum.NO_DEPARTMENTS_IN_RESULT);
      }
    }

  }

  public static async findCityByCodeAndCity(name: string, code: string): Promise<Cities> {

    console.log('city name:' + name + ' code:' +code);
    const mcit: Cities = await getRepository(Cities)
      .createQueryBuilder('Cities')
      .where('UPPER(city) = \'' + name.toUpperCase() + '\' and code = \'' + code + '\'')
      .getOne();
    if (mcit) {
      console.log('city:' + mcit.city);
      return Promise.resolve(mcit);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

}