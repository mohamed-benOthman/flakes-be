import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidat } from './candidat.entity';

@Injectable()
export class CandidatService {
  constructor(
    @InjectRepository(Candidat)
    private readonly CandidatRepository: Repository<Candidat>,
  ) {}

  async findAll(): Promise<Candidat[]> {
    return await this.CandidatRepository.find();
  }
}