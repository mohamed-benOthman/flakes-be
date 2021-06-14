import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Cities } from '../Cities/cities.entity';
import { Role } from '../Role/role.entity';
import { GiftPosted } from '../GiftPosted/giftposted.entity';
import { JsonProperty } from 'json-typescript-mapper';
import {ToolService} from '../common/tool/tool.service';
import {UserMailDto} from './Model/UserMailDto';

@Entity('User')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ length: 150 })
  login: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 50 })
  pass: string;

  @Column({ length: 20 })
    phone: string;

  @Column()
    valide: number;

  @Column({ length: 250 })
    code: string;

  @Column({ length: 400 })
    token: string;

  @Column()
    verified: boolean;

    //@ManyToOne(type => Role, roles => roles.user, {nullable: false, onDelete: 'CASCADE'})
    @Column()
    roles: number;

    @Column()
    idMaquilleuse: number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    tokenDate: Date;

    @Column()
    resetPassswordToken: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    resetPassswordTokenDate: Date;

    public static async findAll(): Promise<User[]> {

    const user: User[] = await User.find();
    if (user.length > 0) {
      return Promise.resolve(user);
    } else {
      throw new AppError(AppErrorEnum.NO_USER_IN_DB);
    }

  }

  public static async findUserById(idUser): Promise<User> {
    const user: User = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.idUser=' + idUser)
      .getOne();
    if (user != null) {
      return Promise.resolve(user);
    } else {
      throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
    }

  }

    public static async findUserByEmail(email: string): Promise<User> {
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= \'' + email + '\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }

    }

    public static async findUserByCode(code: string): Promise<User> {
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.code= \'' + code + '\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }

    }

    public static async resendEmail(id: string): Promise<{ succeeded: boolean, verified: boolean}>{
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= \'' + id + '\'')
            .getOne();

        console.log(user);
        if (user){
            console.log('userFound');
            if (user.verified === false){
                const token = ToolService.getHashMD5(user.email);
                user.token = token;
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                user.tokenDate = currentDate;
                await User.save(user);
                const userToInEmail: UserMailDto = {
                    login: user.login,
                    email: user.email,
                    tel: user.phone,
                };
                console.log(user.token);
                ToolService.sendMailConfirmation(userToInEmail, userToInEmail, 1, user.token);
                return Promise.resolve({succeeded: true, verified: false});
            }
            else{
                console.log('verified');
                return Promise.resolve({succeeded: false, verified: true});
            }

        }
        else  return Promise.resolve({succeeded: false, verified: false});
    }

    public static async sendEmailWithPasswordToken(email: string): Promise<any>{
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= \'' + email + '\'')
            .getOne();

        const token = ToolService.getHashMD5(email);

        if (user != null) {

            user.resetPassswordToken = token;
            user.resetPassswordTokenDate = new Date();
            await User.save(user);
            const userToInEmail: UserMailDto = {
                login: user.login,
                email: user.email,
                tel: user.phone,
            };
            ToolService.sendMailConfirmation(userToInEmail, userToInEmail, 3, user.resetPassswordToken);
            return Promise.resolve({succeeded: false});
        } else {
            throw new AppError(AppErrorEnum.NO_USERS_IN_DB);
        }

    }

    public static async checkConfirmationToken(token: string): Promise<{ verified: boolean, message: string, timeout: boolean }>{
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.token= \'' + token + '\'')
            .getOne();
        if (user != null) {

            if (user.token === token)
            {   const now = Date.now();
                if ((now - Date.parse(user.tokenDate.toString())) > 604800000)
               {

                    return Promise.resolve({verified: false, message: 'depasser 24 heures', timeout: true});
               }
               else {
                   if (user.verified === true)
                       return Promise.resolve({verified: false, message: 'utilisateur déja vérifié', timeout: false});
                   else {
                       user.verified = true;
                       await User.save(user);
                       return Promise.resolve({verified: true, message: 'verifier avec succes', timeout: false});
                   }

               }
            }

            else
                return Promise.resolve({verified: false, message: 'token not accepted', timeout: false});
        } else {
            throw new AppError(AppErrorEnum.NO_USERS_IN_DB);
        }

    }

    public static async checkResetPasswordToken(token: string): Promise<{ verified: boolean, message: string, timeout: boolean }>{
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.resetPassswordToken= \'' + token + '\'')
            .getOne();
        if (user != null) {

            if ((user.resetPassswordToken === token) && (user.resetPassswordToken !== '0000'))
            {   const now = Date.now();
                if ((now - Date.parse(user.resetPassswordTokenDate.toString())) > 604800000)
                {

                    return Promise.resolve({verified: false, message: 'depasser 24 heures', timeout: true});
                }

                    else {

                        return Promise.resolve({verified: true, message: 'verifier avec succes', timeout: false});
                    }

            }

            else
                return Promise.resolve({verified: false, message: 'token not accepted', timeout: false});
        } else {
            throw new AppError(AppErrorEnum.NO_USERS_IN_DB);
        }

    }

    public static async resetPassword(token: string, password: string): Promise<any>{
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.resetPassswordToken= \'' + token + '\'')
            .getOne();
        if (user != null) {

            if ((user.resetPassswordToken === token) && (user.resetPassswordToken !== '0000'))
            {   const now = Date.now();



                    user.pass = ToolService.getBCryptHash(password);
                    user.resetPassswordToken = '0000';
                    await User.save(user);
                    const userToInEmail: UserMailDto = {
                        login: user.login,
                        email: user.email,
                        tel: user.phone,
                    };
                    ToolService.sendResetEmailSuccess(userToInEmail,userToInEmail);
                    return Promise.resolve({passwordReset: true});


            }

            else{
                console.log("le bug est tres grave");
                return Promise.resolve({passwordReset: false});
            }

        } else {
            throw new AppError(AppErrorEnum.NO_USERS_IN_DB);
        }

    }

    public static async createUserMakup(makupuser: Maquilleuse, toUpdate: boolean): Promise<User> {

    let user: User;

    if (!toUpdate)
      user = new User();
    else{
      user = User.findOne({email: makupuser.emailAdress});
    }
    user.login = makupuser.username;
    user.email = makupuser.emailAdress;
    user.pass = makupuser.password;
    user.idMaquilleuse = makupuser.idMaquilleuse;
    user.phone = makupuser.phone;
    user.roles = 1;

    const umakup: User = await User.save(user);

    return umakup;

  }

    public static async findUserByIdWithRole(emailUser: string): Promise<User> {
      console.log('findUserByIdWithRole');
      const user = await getRepository(User)
            .createQueryBuilder('User')
            .leftJoinAndSelect('User.roles', 'Role')
            .where('User.email = \'' + emailUser + '\'')
            .getOne()
          .catch((err) => {
            console.log(err);
            console.error(err);
          });

      console.log('user.idUSer:' + user.idUser);
      return user;
    }

    public static async createUser(email: string, login: string, pass: string, phoneUser: string, role: string ): Promise<User> {
        const user: User = new User();
        user.email = email;
        user.login = login;
        user.pass = pass;
        user.phone = phoneUser;
        user.roles = role;
        console.log('phone:' + phoneUser);
        const u: User = await User.save(user);
        return u;

    }

    public static async updateUser(email: string, login: string, pass: string, phoneUser, role: string ): Promise<User> {
        const user: User = await User.findOneByEmail(email);

        user.login = (login !== '') ? login : user.login;
        user.pass = (pass !== '') ? pass : user.pass;
        user.phone = (phoneUser !== '') ? phoneUser : user.phone;
        user.roles = (role !== '') ? role : user.roles;
        console.log('phone:' + phoneUser + ' user.phone:' + user.phone);
        const u: User = await User.save(user);
        return u;

    }

    public static async findOneByEmail(email: string){

        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email=\'' + email + '\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }
    }

    public static async findOneByCode(code: string){

        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.code=\'' + code + '\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }
    }

}
