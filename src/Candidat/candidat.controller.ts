import { Controller, Get } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { Candidat } from './candidat.entity';

@Controller('candidat')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Get()
  findAll(): Promise<Candidat[]> {
    return this.candidatService.findAll();
  }
}