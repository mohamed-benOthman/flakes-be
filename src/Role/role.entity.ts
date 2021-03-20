import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId, ManyToMany, JoinTable } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { JsonProperty } from 'json-typescript-mapper';
import { User } from '../User/user.entity';


@Entity('Role')
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column({ length: 150 })
  Libelle: string;



  @OneToMany(type => User, user => user.Role)
    users: User[];




  public static async findAll(): Promise<Role[]> {

    const role: Role[] = await Role.find();
    if (role.length > 0) {
      return Promise.resolve(role);
    } else {
      throw new AppError(AppErrorEnum.NO_ROLE_IN_DB);
    }

  }

  public static async findRoleById(idRole): Promise<Role> {
    const role: Role = await getRepository(Role)
      .createQueryBuilder('role')
      .where('idRole=' + idRole)
      .getOne();
    if (role != null) {
      return Promise.resolve(role);
    } else {
      throw new AppError(AppErrorEnum.NO_ROLE_IN_RESULT);
    }

  }

}