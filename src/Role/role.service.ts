import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import {IRoleService} from './IRoleService';

@Injectable()
export class RoleService implements IRoleService{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findRoleById(id): Promise<Role> {
    return await Role.findRoleById(id);
  }

}