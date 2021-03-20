
// import {ProjectEntity} from '../project/project.entity';
import { Role } from './role.entity';

export interface IRoleService {
  findAll(): Promise<Role[]>;
  findRoleById(id): Promise<Role>;
//  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}