import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EffPrestation } from './effprestation.entity';

@Injectable()
export class EffPrestationService {
  constructor(
    @InjectRepository(EffPrestation)
    private readonly EffPrestationRepository: Repository<EffPrestation>,
  ) {}

  async findAll(): Promise<EffPrestation[]> {
    return await this.EffPrestationRepository.find();
  }
}