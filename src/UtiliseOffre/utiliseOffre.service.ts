import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtiliseOffre } from './utiliseOffre.entity';

@Injectable()
export class UtiliseOffreService {
  constructor(
    @InjectRepository(UtiliseOffre)
    private readonly utiliseOffreRepository: Repository<UtiliseOffre>,
  ) {}

  async findAll(): Promise<UtiliseOffre[]> {
    return await this.utiliseOffreRepository.find();
  }
}