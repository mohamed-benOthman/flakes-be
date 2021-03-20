import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cities } from './cities.entity';
import {ICitiesService} from './ICitiesService';
import { Departments } from '../Departments/departments.entity';

@Injectable()
export class CitiesService implements ICitiesService{
  constructor(
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
  ) {}

  async findAll(): Promise<Cities[]> {
    return await this.citiesRepository.find();
  }

  async findCitiesByName(name, zipcode): Promise<Cities[]> {
    return await Cities.findCitiesByName(name, zipcode);
  }

}