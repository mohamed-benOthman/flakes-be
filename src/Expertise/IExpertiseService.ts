
// import {ProjectEntity} from '../project/project.entity';
import { Expertise } from './expertise.entity';

export interface IExpertiseService {
  findAll(): Promise<Expertise[]>;
  findExpertiseById(id): Promise<Expertise>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}