import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OffreCommerciale } from './offrecommerciale.entity';

@Injectable()
export class OffreCommercialeService {
  constructor(
    @InjectRepository(OffreCommerciale)
    private readonly offreCommRepository: Repository<OffreCommerciale>,
  ) {}

  async findAll(): Promise<OffreCommerciale[]> {
    return await this.offreCommRepository.find();
  }
}