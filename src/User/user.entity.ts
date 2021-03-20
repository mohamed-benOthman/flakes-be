import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Cities } from '../Cities/cities.entity';
import { Role } from '../Role/role.entity';
import { GiftPosted } from '../GiftPosted/giftposted.entity';
import { JsonProperty } from 'json-typescript-mapper';

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


    //@ManyToOne(type => Role, roles => roles.user, {nullable: false, onDelete: 'CASCADE'})
  @Column()
    roles: number;

    @Column()
    idMaquilleuse: number;


    /*@OneToMany(type => Gift, gift => gift.User)
    gifts: Gift[];

    @OneToMany(type => GiftPosted, giftposted => giftposted.User)
    giftposteds: GiftPosted[];*/

  // @RelationId((photos: Photos) => photos.maquilleuse) // This is just to save the foreign key in this attribute.
//  maquilleuseId: number = undefined

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


    public static async findUserByEmail(email:string): Promise<User> {
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email= \'' + email+'\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }

    }

    public static async findUserByCode(code:string): Promise<User> {
        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.code= \'' + code+'\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }

    }


  public static async createUserMakup(makupuser: Maquilleuse,toUpdate:boolean): Promise<User> {

    let user:User;

    if(!toUpdate)
      user = new User();
    else{
      user = User.findOne({email: makupuser.emailAdress});
    }
    user.login= makupuser.username;
    user.email= makupuser.emailAdress;
    user.pass = makupuser.password;
    user.idMaquilleuse = makupuser.idMaquilleuse;
    user.phone = makupuser.phone;
    user.roles=1;


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


      console.log("user.idUSer:"+user.idUser);
        return user;
    }

    public static async createUser(email: string, login:string, pass: string, phoneUser:string, role:string ): Promise<User> {
        let user: User = new User();
        user.email= email;
        user.login=login;
        user.pass=pass;
        user.phone=phoneUser;
        user.roles=role;
        console.log("phone:"+phoneUser);
        const u: User = await User.save(user);
        return u;

    }

    public static async updateUser(email: string, login:string, pass: string, phoneUser,role:string ): Promise<User> {
        let user: User = await User.findOneByEmail(email);

        user.login=(login!=="")?login:user.login;
        user.pass=(pass!=="")?pass:user.pass;
        user.phone=(phoneUser!=="")?phoneUser:user.phone;
        user.roles=(role!=="")?role:user.roles;
        console.log("phone:"+phoneUser+" user.phone:"+user.phone);
        const u: User = await User.save(user);
        return u;

    }

    public static async findOneByEmail(email:string){

        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email=\'' + email+'\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }
    }

    public static async findOneByCode(code:string){

        const user: User = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.code=\'' + code+'\'')
            .getOne();
        if (user != null) {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorEnum.NO_USER_IN_RESULT);
        }
    }

}
