import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EtatPrestation } from './etatprestation.entity';

@Injectable()
export class EtatPrestationService {
  constructor(
    @InjectRepository(EtatPrestation)
    private readonly etatPrestRepository: Repository<EtatPrestation>,
  ) {}

  async findAll(): Promise<EtatPrestation[]> {
    return await this.etatPrestRepository.find();
  }
}