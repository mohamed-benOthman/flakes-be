import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expertise } from './expertise.entity';
import {IExpertiseService} from './IExpertiseService';

@Injectable()
export class ExpertiseService implements IExpertiseService{
  constructor(
    @InjectRepository(Expertise)
    private readonly expertiseRepository: Repository<Expertise>,
  ) {}

  async findAll(): Promise<Expertise[]> {
    return await this.expertiseRepository.find();
  }

  async findExpertiseById(id): Promise<Expertise> {
    return await Expertise.findExpertiseById(id);
  }

}