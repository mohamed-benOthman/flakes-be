
// import {ProjectEntity} from '../project/project.entity';
import { Business } from './user.entity';

export interface IUserService {
  findAll(): Promise<User[]>;
  findUSerById(id): Promise<User>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}