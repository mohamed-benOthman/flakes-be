
// import {ProjectEntity} from '../project/project.entity';
import { Regions } from './regions.entity';
import { Departments } from '../Departments/departments.entity';

export interface IRegionsService {
  findAll(): Promise<Regions[]>;
  findRegionsByName(name): Promise<Regions[]>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}