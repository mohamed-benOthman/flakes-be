import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maquilleuse } from './maquilleuse.entity';
import {IMaquilleuseService} from './IMaquilleuseService';
import {CreateMaquilleuseDto} from './Model/CreateMaquilleuseDto';
import {ToolService} from '../common/tool/tool.service';
import { LoginFlakes } from '../common/config';
import { MaquilleuseI } from './interfaces/maquilleuse.interface';
import { MailFlakes } from '../common/config';
import {UserService} from '../User/user.service';
import {User} from '../User/user.entity';
// import {ProjectEntity} from '../project/project.entity';

@Injectable()
export class MaquilleuseService implements IMaquilleuseService{
  constructor(
    @InjectRepository(Maquilleuse)
    private readonly maquilleuseRepository: Repository<Maquilleuse>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Maquilleuse[]> {
    return await this.maquilleuseRepository.find();
  }
  async updateMaquilleuse(newMaquilleuse: any): Promise<Maquilleuse> {
    return await Maquilleuse.updateMaquilleuse(newMaquilleuse);
  }
  async findMaquilleuseByUsername(username: string): Promise<Maquilleuse> {
    return await Maquilleuse.findMaquilleuseByUsername(username);
  }

  async isMaquilleuseExisted(parametre: string, type: string) {
    return await Maquilleuse.isMaquilleuseExisted(parametre, type);
  }

  async findMaquilleuseByDept(dept: string, debt: number, nbr: number): Promise<Maquilleuse[]> {
    return await Maquilleuse.findMaquilleuseByDept(dept, debt, nbr);
  }

  async findMaquilleuseByTown(zipcode: string, town: string, debt: number, nbr: number): Promise<Maquilleuse[]> {
    return await Maquilleuse.findMaquilleuseByCities(zipcode, town, debt, nbr);
  }

  async findMaquilleuseByBusiness(business: number, debt: number, nbr: number): Promise<Maquilleuse[]> {
    return await Maquilleuse.findMaquilleuseByBusiness(business, debt, nbr);
  }

  async findMaquilleuseByExpertise(expertise: number, debt: number, nbr: number): Promise<Maquilleuse[]> {
    return await Maquilleuse.findMaquilleuseByExpertise(expertise , debt, nbr);
  }

  async findMaquilleuseTypeAll(param: string, type: string, debt: number, nbr: number): Promise<Maquilleuse[]> {
    return await Maquilleuse.findMaquilleusetypeAll( param , type, debt, nbr);
  }

  async findAllMaquilleuseNbr(param: string, type: string){
    return await Maquilleuse.findAllMaquilleusetByCriteria( param , type);
  }

  async findAllMaquilleuses(){
    return await Maquilleuse.getAllMaquilleuses2();
  }
  async deleteMaquilleuse(user:any){
    return await Maquilleuse.deleteMaquilleuse(user);
  }
  async getMaquilleuseByUsername(username:any){
    return await Maquilleuse.getMaquilleuseByUsername(username);
  }

  async findMaquilleuseByEmail(email: string): Promise<Maquilleuse> {
    console.log('email:' + email);
    return await Maquilleuse.findMaquilleuseByEmail(email);
  }

  async findMaquilleuseByUserNamePayment(userName: string): Promise<any> {
    return await Maquilleuse.getMaquilleuseByUsernameForPayment2(userName);
  }





  public async createUser(user: CreateMaquilleuseDto, isUpdate: boolean): Promise<Maquilleuse> {

    console.log('User:' + user.idMaquilleuse);
    console.log('la maquilleuse ::::::');
    console.log(user);
    const u: Maquilleuse = await Maquilleuse.findOne({idMaquilleuse: user.idMaquilleuse});

    if (!u) {
      isUpdate = false;
    }
    else{
      isUpdate = true;
    }

    console.log('u:' + u);
    const userresult: Maquilleuse = await Maquilleuse.createMakeup(user, isUpdate, u);

/*    if ((userresult != 1001) && (userresult != 1002)){

        const usmaq: User = await User.createUserMakup(userresult, isUpdate);

        console.log('create Makup from usmaq id:' + usmaq.idUser);
        const uresult: User = await this.userService.updateActiveCode(usmaq);
        console.log('updateActiveCode');
        if (userresult !== undefined) {

          //    if(type===1) {
          //  console.log("create: "+type+"giftpostedResult.idGift:"+giftpostedResult.idGift);
          ToolService.sendValidationMail({ login: LoginFlakes, email: MailFlakes }, {
            login: uresult.login,
            email: uresult.email,
          }, uresult.code);
        }
    }*/
    return userresult;

  }
}
