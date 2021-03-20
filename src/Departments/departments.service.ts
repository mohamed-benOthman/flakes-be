import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departments } from './departments.entity';
import {IDepartmentsService} from './IDepartmentsService';

@Injectable()
export class DepartmentsService implements IDepartmentsService{
  constructor(
    @InjectRepository(Departments)
    private readonly departmentsRepository: Repository<Departments>,
  ) {}

  async findAll(): Promise<Departments[]> {
    return await this.departmentsRepository.find();
  }

  async findDepartmentsByName(name): Promise<Departments[]> {
   // console.log('name:'+name);
    return await Departments.findDeptByName(name);
    
  }

}