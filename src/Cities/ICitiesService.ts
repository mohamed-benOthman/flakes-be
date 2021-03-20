
// import {ProjectEntity} from '../project/project.entity';
import { Cities } from './cities.entity';

export interface ICitiesService {
  findAll(): Promise<Cities[]>;
  findCitiesByName(name, zipcode): Promise<Cities[]>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}