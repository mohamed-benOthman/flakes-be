import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import {IBusinessService} from './IBusinessService';

@Injectable()
export class BusinessService implements IBusinessService{
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async findAll(): Promise<Business[]> {
    return await this.businessRepository.find();
  }

  async findBusinessById(id): Promise<Business> {
    return await Business.findBusinessById(id);
  }

}