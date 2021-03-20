
// import {ProjectEntity} from '../project/project.entity';
import { Business } from './business.entity';

export interface IBusinessService {
  findAll(): Promise<Business[]>;
  findBusinessById(id): Promise<Business>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}