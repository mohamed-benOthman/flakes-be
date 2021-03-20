
// import {ProjectEntity} from '../project/project.entity';
import { Departments } from './Departments.entity';

export interface IDepartmentsService {
  findAll(): Promise<Departments[]>;
  findDepartmentsByName(name): Promise<Departments[]>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}