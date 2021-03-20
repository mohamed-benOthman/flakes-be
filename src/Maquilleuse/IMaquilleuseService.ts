import { CreateMaquilleuseDto } from './Model/CreateMaquilleuseDto';
// import {ProjectEntity} from '../project/project.entity';
import { Maquilleuse } from './maquilleuse.entity';

export interface IMaquilleuseService {
  findAll(): Promise<Maquilleuse[]>;
  createUser(user: CreateMaquilleuseDto): Promise<Maquilleuse>;
  findMaquilleuseByUsername(username: string): Promise<Maquilleuse>;
  findMaquilleuseByEmail(email: string): Promise<Maquilleuse>;
  findMaquilleuseByExpertise(expertise: number, debt: number, nbr: number): Promise<Maquilleuse[]>;
  findMaquilleuseTypeAll(param: string, type: string, debt: number, nbr: number): Promise<Maquilleuse[]>;
  findMaquilleuseByBusiness(business: number, debt: number, nbr: number): Promise<Maquilleuse[]>;
  findMaquilleuseByTown(zipcode: string, town: string, debt: number, nbr: number): Promise<Maquilleuse[]>;
  findMaquilleuseByDept(dept: string, debt: number, nbr: number): Promise<Maquilleuse[]>;
  // getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
  findAllMaquilleuseNbr(param: string, type: string) ;
  isMaquilleuseExisted(parametre: string, type: string);
  findAllMaquilleuses();
}
