
// import {ProjectEntity} from '../project/project.entity';
import { Photos } from './photos.entity';

export interface IPhotosService {
  findAll(): Promise<Photos[]>;
  findPhotosById(id): Promise<Photos>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}