import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from './regions.entity';
import {IRegionsService} from './IRegionsService';
import { Departments } from '../Departments/departments.entity';

@Injectable()
export class RegionsService implements IRegionsService{
  constructor(
    @InjectRepository(Regions)
    private readonly regionsRepository: Repository<Regions>,
  ) {}

  async findAll(): Promise<Regions[]> {
    return await this.regionsRepository.find();
  }

  async findRegionsByName(name): Promise<Regions[]> {
    return await Regions.findRegionByName(name);
  }

}