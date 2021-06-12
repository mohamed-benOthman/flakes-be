import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {IUserService} from './IUserService';
import { InjectModel } from '@nestjs/mongoose';
import {LoginUserDto} from './Model/login-user.dto';
import {EnvoiMailDto} from './Model/EnvoiMailDto';
//import {Gift} from '../Gift/gift.entity';
import {ToolService} from '../common/tool/tool.service';
import { UserRO } from './user.interface';
import {autovalidAdmin} from '../common/config';
const jwt = require('jsonwebtoken');
const awt = require('jsonwebtoken');
import { SECRET } from '../common/config';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { LoginSofwee } from '../common/config';
import { MailSofwee } from '../common/config';
import { sactive } from '../common/config';
@Injectable()
export class UserService implements IUserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
//    private readonly giftPostedService: GiftPostedService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUserById(id:number): Promise<User> {
    return await User.findUserById(id);
  }



    async findById(id: number): Promise<UserRO>{
        const user = await User.findUserById(id);

        if (!user) {
            console.log("401 find By Id");
            const errors = {User: ' not found'};
            throw new HttpException({errors}, 401);
        };

        return this.buildUserRO(user);
    }


    async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const findOneOptions = {
            email: loginUserDto.email,
            password: ToolService.getBCryptHash(loginUserDto.password),
           // password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
        };

       // const gift:Gift = await Gift.findGiftByIdWithUser(loginUserDto.idGift);
        //let userFound=await User.findOneByEmail(findOneOptions.email);
       // if(gift.User.email === loginUserDto.email) {
            return await User.findOneByEmail(findOneOptions.email);
        /*}
        else{

            console.log("401 findOne");
            const errors = {User: ' not owner'};
            throw new HttpException({errors}, 401);
        }*/
    }



    public generateJWT(user) {

      console.log('1 ---- Set Date ok= login:');
        let today = new Date();
        let exp = new Date(today);

      console.log('2 ---- Set Date ok= login:'+user.login+' id:'+user.idUser+' email:'+user.email);
        exp.setDate(today.getDate() + 60);

      console.log('Set Date ok= login:'+user.login+' id:'+user.idUser+' email:'+user.email);


      return jwt.sign({
            id: user.idUser,
            username: user.login,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, sactive);
    };

    public generateJWTLog(user) {
        let today = new Date();
        let exp = new Date(today);
       // exp.setDate(today.getDate() + 60);
      exp.setDate(today.getDate());

      return jwt.sign({
            id: user.idUser,
            username: user.login,
            email: user.email,
            role:user.roles,
            exp: (exp.getTime()/1000)  + 900,
        }, sactive);
    };


    async findByEmail(email: string): Promise<UserRO>{
        const user = await this.userRepository.findOne({email: email});
        return this.buildUserRO(user);
    }

    async findUserByMail(email: string): Promise<UserRO>{
        //console.log("0 user:"+email);
        const user = await User.findUserByEmail(email);
        //console.log("1 user:");
        //console.log("user:"+user.login);
        return user;
    }

    async findUserByCode(code: string): Promise<UserRO>{
        //console.log("0 user:"+email);
        const user = await User.findUserByCode(code);
        //console.log("1 user:");
        //console.log("user:"+user.login);
        return user;
    }


    async checkConfimationToken(id:string, token: string):Promise<any>{

        const res=await User.checkConfirmationToken(id,token);
        return res;

    }

    /*
    Get the User by Email from database
     */
    async findUserByEmail(email: string): Promise<User>{
        const user = await User.findUserByIdWithRole(email);
        return user;
    }


    public async findById(idU: string): Promise<UserRO>{
        const user = await this.userRepository.findOne({idUser: idU});
        return user;
    }

    private buildUserRO(user: User) {
        const userRO = {
            username: user.login,
            email: user.email,
            token: this.generateJWT(user),
            //image: user.image
        };

        return {user: userRO};
    }

    public async envoiMail(envoiMail: EnvoiMailDto){
        const giftMail = await Gift.findGiftByIdWithUser(envoiMail.idGift);


        console.log("envoiMail.loginSender:"+envoiMail.loginSender);
        console.log("envoiMail.emailSender:"+envoiMail.emailSender);
        console.log("envoiMail.phoneSender:"+envoiMail.updateActiveCodeSender);

        console.log("giftMail.User.login:"+giftMail.User.login);
        console.log("giftMail.User.email:"+giftMail.User.email);
        console.log("giftMail.User.email:"+giftMail.nom);

        ToolService.sendMailUser({login: envoiMail.loginSender, email: envoiMail.emailSender,tel:envoiMail.phoneSender,titregift:giftMail.nom}, {
            login: giftMail.User.login,
            email: giftMail.User.email
        }, envoiMail.message,giftMail.nom);
    }

    public async activateUser(code:string,idGift:number){
        const user:User= await User.findOneByCode(code);
        const decoded: any = awt.verify(code, sactive);

        console.log("activate user");
        if (user === undefined) {
            const errors = {User: ' not found'};
            throw new HttpException({errors}, 401);
        };
        user.valide=1;
        let u: User = await User.save(user);
      //  if(autovalidAdmin===1){

          // const  giftCreated:Gift=await this.giftService.validateGift(idGift);

           // console.log("giftCreated.emailUser:"+user.email);
            ToolService.sendMail({login: LoginSofwee, email: MailSofwee}, {
                login: user.login,
                email: user.email
            }, 1);

        //}

        //const  giftCreated:Gift=await GiftPostedService.emailValidateGiftPosted(idGift);
        u.code="";
        const uValide: User = await User.save(u);

        return uValide;
    }


    public generateActiveCode(user:User) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);


        return awt.sign({
            id: user.idUser,
            username: user.login,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, sactive);
    };


    public async updateActiveCode(user):Promise<User>{

        const code:string = await this.generateActiveCode(user);

        user.code=code;
        console.log("user used:"+user.id)
        const u: User = await User.save(user);

        return u;
    }

    public async updateUserPass(user,newpass):Promise<User>{

        console.log('user login:'+user.login+" email"+user.email+" phone:"+user.phone);
        user.pass= ToolService.getBCryptHash(newpass);
        console.log('update pass done');
        const u: User = await User.save(user);
      console.log('update user done');
        return u;
    }



    public async forgotPasswordMail(id:string,email:string,login:string,code:string){

        console.log("Forgot paswword email:"+email+" code:"+code+" login:"+login);
        ToolService.forgotPasswordMail(email,login,code);

    }

}
