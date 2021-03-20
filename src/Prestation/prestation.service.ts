import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestation } from './prestation.entity';

@Injectable()
export class PrestationService {
  constructor(
    @InjectRepository(Prestation)
    private readonly prestationRepository: Repository<Prestation>,
  ) {}

  async findAll(): Promise<Prestation[]> {
    return await this.prestationRepository.find();
  }
}