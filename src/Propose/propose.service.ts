import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propose } from './propose.entity';

@Injectable()
export class ProposeService {
  constructor(
    @InjectRepository(Propose)
    private readonly proposeRepository: Repository<Propose>,
  ) {}

  async findAll(): Promise<Propose[]> {
    return await this.proposeRepository.find();
  }
}