import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  RelationId,
  getRepository,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import * as crypto from 'crypto';
import { CreateMaquilleuseDto } from './Model/CreateMaquilleuseDto';
import { Cities } from '../Cities/cities.entity';
import { Departments } from '../Departments/departments.entity';
import { Photos } from '../Photos/photos.entity';
import { JsonProperty } from 'json-typescript-mapper';
import { Business } from '../Business/business.entity';
import {ToolService} from '../common/tool/tool.service';
import { Expertise } from '../Expertise/expertise.entity';
import { AppSearchingTypeEnum } from '../common/error/AppSearchingTypeEnum';
import { MaquilleuseI } from './interfaces/maquilleuse.interface';
import {User} from '../User/user.entity';

@Entity('maquilleuse')
export class Maquilleuse extends BaseEntity{
  @PrimaryGeneratedColumn()
  idMaquilleuse: number;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 200 })
  emailAdress: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 300 })
  street: string;

  @Column({ length: 400 })
  slogan: string;

  @Column({ length: 200 })
  photo_profile: string;
  @JsonProperty('photos')
  @OneToMany(type => Photos, photos => photos.maquilleuse, { cascade: true, eager: true })
  photosUrl: Photos[];
  @ManyToOne(type => Cities, cities => cities.maquilleuses, { nullable: false, onDelete: 'CASCADE' })
  cities: Cities;

  @ManyToMany(type => Business)
  @JoinTable()
  business: Business[];

  @ManyToMany(type => Expertise)
  @JoinTable()
  expertises: Expertise[];

  /*@ManyToOne(type => Departments, departments => departments.maquilleuses, { nullable: false, onDelete: 'CASCADE' })
  public department_code: Departments;*/

  @Column({ length: 50 })
  password: string;

  @Column()
  movings: number;

  public static async findAll(debut: number, cpt: number): Promise<Maquilleuse[]> {
    console.log('Find All execution');
    const users: Maquilleuse[] = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .skip(debut)
      .take(cpt)
      .getMany()
      .catch((err) => {
        console.log(err);
        console.error(err);
      });

    console.log('End All execution');
    if (users.length > 0) {
      return Promise.resolve(users);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_DB);
    }

  }

  public static async findAllMaquilleusetByCriteria(param: string, type: string) {

   // console.log("Essai nbr Maq");
    const tabParam = param.split('|');
    const tabType = type.split('|');
    let condition: string;
    condition = '';
    let iscond: boolean = false;
    if (type !== '0') {
      if (type === '5') {
        condition += ' maquilleuse.username = \'' + param + '\'';
      }
      else {
        if (type === '6') {
          condition += ' maquilleuse.emailAdress = \'' + param + '\'';
        }
        else {

          for (const typ of tabType) {

            if (typ === '1') {
              if (iscond) {
                condition += 'and department.code in (' + tabParam[0] + ') ';
              }
              else {
                condition += 'department.code in (' + tabParam[0] + ') ';
              }
              iscond = true;
            }
            else if (typ === '2') {

              const tabParamCity = tabParam[1].split(';');
              if (iscond) {
                condition += 'and cities.code = \'' + tabParamCity[0] + '\' and city = \'' + tabParamCity[1] + '\' ';
              }
              else {
                condition += 'cities.code = \'' + tabParamCity[0] + '\' and city = \'' + tabParamCity[1] + '\' ';
              }
              iscond = true;

            }
            else if (typ === '3') {
              if (iscond) {
                condition += 'and business.idBusiness in (' + tabParam[2] + ') ';
              }
              else {
                condition += 'business.idBusiness in (' + tabParam[2] + ') ';
              }
              iscond = true;

            }

            else if (typ === '4') {
              if (iscond) {
                condition += 'and expertise.idExpertise in (' + tabParam[3] + ') ';
              }
              else {
                condition += 'expertise.idExpertise in (' + tabParam[3] + ') ';
              }
              iscond = true;

            }
          }
        }
      }
    }

   // console.log(condition);
    let nbr: number = -1;
    if (iscond){
      nbr = await getRepository(Maquilleuse)
      // const requete: string = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('cities.department_code', 'department')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .where(condition)
         .getCount();
        // .getQuery();
      //console.log("requete:"+requete);
    }
    else{
      nbr = await getRepository(Maquilleuse)
      // const requete: string = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('cities.department_code', 'department')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
         .getCount();
       //  .getquery();

     // console.log("requete:"+requete);
    }

    //console.log('Essai 2');

    if (nbr !== undefined) {
      return Promise.resolve(nbr);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async findMaquilleuseByUsername(username: string): Promise<Maquilleuse> {

    const martist: Maquilleuse = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('maquilleuse.username = \'' + username + '\'')
      .getOne();
    if (martist) {
      return Promise.resolve(martist);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }
  public static async updateMaquilleuse(user: any): Promise<Maquilleuse> {

    const u: Maquilleuse = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .where('maquilleuse.username = \'' + user.username + '\'')
        .getOne();

    if (u) {
      u.firstname = user.firstname;
      u.username = user.username;
      u.lastname = user.lastname;
      u.emailAdress = user.emailAdress;
      u.password = ToolService.getBCryptHash(user.password);
      u.phone = user.phone;
      u.photo_profile = user.photo_profile;
      u.slogan = user.slogan;
      u.street = user.street;
      u.movings = user.movings;

      console.log(u);
      let makeupArt: Maquilleuse = await Maquilleuse.save(u);

    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }
  public static async deleteMaquilleuse(user: any) {
    console.log(user);
    const u: Maquilleuse = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .where('maquilleuse.username = \'' + user + '\'')
        .getOne();

    if (u) {
      let makeupArt: Maquilleuse = await Maquilleuse.remove(u);

    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }
  public static async getAllMaquilleuses2(): Promise<Maquilleuse> {

    const martist: Maquilleuse = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .getMany();

    return Promise.resolve(martist);

  }

  public static async findMaquilleuseByDept(dept: string, debut: number, cpt: number): Promise<Maquilleuse[]> {

    const martists: Maquilleuse[] = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('cities.department_code', 'department')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('department.code = \'' + dept + '\'')
      .skip(debut)
      .take(cpt)
      .getMany();
    if (martists.length > 0) {
      return Promise.resolve(martists);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async isMaquilleuseExisted(parametre: string, type: string) {

    let condition: string;
    if (type === 'E'){
      condition = 'maquilleuse.emailAdress = \'' + parametre + '\'';
    }
    else{
      if (type === 'U')
        condition = 'maquilleuse.username = \'' + parametre + '\'';
    }

    // console.log('condition:'+condition);
    const martists: Maquilleuse = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .where(condition)
      .getOne();
    if (martists !== undefined) {
      return true;
    } else {
      return false;
    }

  }

 /* public static async getAllMquilleuses(){

    const respositoryMaquilleuse = getRepository(Maquilleuse);
    let  allMaquilleuse = [];
    allMaquilleuse =  await respositoryMaquilleuse.find();
    console.log(allMaquilleuse);
    return allMaquilleuse;
  }*/

  public static async findMaquilleusetypeAll(param: string, type: string, debut: number, cpt: number): Promise<Maquilleuse[]> {

    const tabParam = param.split('|');
    const tabType = type.split('|');
    let condition: string;
    condition = '';
    let iscond: boolean = false;

    if (type !== '0') {
      if (type === '5') {
        condition += ' maquilleuse.username = \'' + param + '\'';
        iscond = true;
      }
      else {
        if (type === '6') {
          condition += ' maquilleuse.emailAdress = \'' + param + '\'';
          iscond = true;
        }
        else {

          for (const typ of tabType) {

            if (typ === '1') {
              if (iscond) {
                condition += 'and department.code in (' + tabParam[0] + ') ';
              }
              else {
                condition += 'department.code in (' + tabParam[0] + ') ';
              }
              iscond = true;
            }
            else if (typ === '2') {

              const tabParamCity = tabParam[1].split(';');
             // console.log('ville:'+tabParam[1]);
              if (iscond) {
                condition += 'and cities.code = \'' + tabParamCity[0] + '\' and city = \'' + tabParamCity[1] + '\' ';
              }
              else {
                condition += 'cities.code = \'' + tabParamCity[0] + '\' and city = \'' + tabParamCity[1] + '\' ';
              }
              iscond = true;

            }
            else if (typ === '3') {
              if (iscond) {
                condition += 'and business.idBusiness in (' + tabParam[2] + ') ';
              }
              else {
                condition += 'business.idBusiness in (' + tabParam[2] + ') ';
              }
              iscond = true;

            }

            else if (typ === '4') {
              if (iscond) {
                condition += 'and expertise.idExpertise in (' + tabParam[3] + ') ';
              }
              else {
                condition += 'expertise.idExpertise in (' + tabParam[3] + ') ';
              }
              iscond = true;

            }

          }
        }
      }
    }

    let martists: Maquilleuse[];
    if (iscond){
      martists = await getRepository(Maquilleuse)
      //const requete: string = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('cities.department_code', 'department')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .where(condition)
        .skip(debut)
        .take(cpt)
       // .getQuery();
        .getMany();
     //   console.log(requete);
    }
    else{
      martists = await getRepository(Maquilleuse)
      //const requete: string = await getRepository(Maquilleuse)
        .createQueryBuilder('maquilleuse')
        .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
        .leftJoinAndSelect('maquilleuse.cities', 'cities')
        .leftJoinAndSelect('cities.department_code', 'department')
        .leftJoinAndSelect('maquilleuse.business', 'business')
        .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
        .skip(debut)
        .take(cpt)
        //.getQuery()

       .getMany();

     //   console.log(requete);

    }

    if (martists.length > 0) {
      return Promise.resolve(martists);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async findMaquilleuseByCities(zipcode: string, name: string, debut: number, cpt: number): Promise<Maquilleuse[]> {

    const martists: Maquilleuse[] = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('cities.code = \'' + zipcode + '\' and city = \'' + name + '\'')
      .skip(debut)
      .take(cpt)
      .getMany();
    if (martists.length > 0) {

      return Promise.resolve(martists);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async findMaquilleuseByBusiness(idBusiness: number, debt: number, nbr: number): Promise<Maquilleuse[]> {

    const martists: Maquilleuse[] = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('business.idBusiness = \'' + idBusiness + '\'')
      .skip(debt)
      .take(nbr)
      .getMany();
    if (martists.length > 0) {

      return Promise.resolve(martists);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async findMaquilleuseByExpertise(idExpertise: number, debut: number, cpt: number): Promise<Maquilleuse[]> {

    const martist: Maquilleuse[] = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('expertise.idExpertise = \'' + idExpertise + '\'')
      .skip(debut)
      .take(cpt)
      .getMany();
    if (martist.length > 0) {
      return Promise.resolve(martist);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async findMaquilleuseByEmail(email: string): Promise<Maquilleuse> {

    const emailMod = email.replace('%40', '@' );
    console.log('email:' + email);
    console.log('decodeURI(email):' + emailMod);
    const  martistEmail: Maquilleuse = await getRepository(Maquilleuse)
      .createQueryBuilder('maquilleuse')
      .leftJoinAndSelect('maquilleuse.photosUrl', 'photos')
      .leftJoinAndSelect('maquilleuse.cities', 'cities')
      .leftJoinAndSelect('maquilleuse.business', 'business')
      .leftJoinAndSelect('maquilleuse.expertises', 'expertise')
      .where('maquilleuse.emailAdress = \'' + emailMod + '\'')
      .getOne()
      .catch((err) => {
        console.log(err);
        console.error(err);
      });
    if (martistEmail !== undefined) {
      return Promise.resolve(martistEmail);
    } else {
      throw new AppError(AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT);
    }

  }

  public static async createMakeup(user: CreateMaquilleuseDto, isUpdate: boolean, u: Maquilleuse): Promise<Maquilleuse> {
    let ucmail: Maquilleuse;

   // console.log('isUpdate:'+isUpdate+' u:'+u);

    if (isUpdate == false) {

      u = await Maquilleuse.findOne({ username: user.username });
      if (u) {

        //throw new AppError(AppErrorEnum.USER_EXISTS);
        return 1002;
      }
      else{
        ucmail = await Maquilleuse.findOne({ emailAdress: user.emailAdress });

        if (ucmail){
          return  1001;
        }
      }
      u = new Maquilleuse();
    }
    else{

    }

    console.log('User:' + u);
    console.log('User id Maquilleuse:' + u.idMaquilleuse);
    console.log('User password:' + user.password);
    console.log('User phone:' + user.phone);
    u.firstname = user.firstname;
    u.username = user.username;
    u.lastname = user.lastname;
    u.emailAdress = user.emailAdress;
    u.password = ToolService.getBCryptHash(user.password);
    u.phone = user.phone;
    u.photo_profile = user.photo_profile;
    u.slogan = user.slogan;
    u.street = user.street;
    u.movings = user.movings;
    console.log('u phone:' + u.phone);

    // console.log('ukkk 1:'+ u);
    // let makeupArt: Maquilleuse = await Maquilleuse.save(u);

    let tabCitie;
    if (user.cities) {

      tabCitie = user.cities.split(';');
      const city: Cities = await Cities.findCityByCodeAndCity(tabCitie[1], tabCitie[0]);
      console.log(' result city:' + city.city + ' code: ' + city.code);
      await Cities.save(city);
      console.log('everythings is allright until photosURL');
      u.cities = city;
    }

    let tabPhotos, tabBusiness, tabExpertises;
    if (user.photosUrl){
      tabPhotos = user.photosUrl.split('|'); u.photosUrl = new Array();

      for (const phot of tabPhotos){
        const p = await Photos.findOne(phot);
        u.photosUrl.push(p);
      }
    }
    if (user.business){
      tabBusiness = user.business.split('|'); u.business = new Array();

      for (const bus of tabBusiness){
        const b = await Business.findOne(bus);
        u.business.push(b);
      }
    }

    if (user.expertises) {
      tabExpertises = user.expertises.split('|');
      u.expertises = new Array();

      for (const exp of tabExpertises){
        const e = await Expertise.findOne(exp);
        u.expertises.push(e);
      }
    }
    // console.log('ukkk 99:' + u);
    // makeupArt = await Maquilleuse.save(u);

    console.log('ukkk 2:' + u);
    console.log('u phone:' + u.phone);

    const maq: Maquilleuse = await Maquilleuse.save(u);

    return maq;

  }

  public static async authenticateUser(user: {username: string, password: string}): Promise<Maquilleuse> {
    let u: Maquilleuse;
    u = await Maquilleuse.findOne({
      select: ['idMaquilleuse', 'username', 'password'],
      where: { username: user.username} });
    const passHash = crypto.createHmac('sha256', user.password).digest('hex');
    if (u.password === passHash) {
      delete u.password;
      return  u;
    }
  }

}
