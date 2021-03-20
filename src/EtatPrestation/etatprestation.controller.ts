import { Controller, Get } from '@nestjs/common';
import { EtatPrestationService } from './etatprestation.service';
import { EtatPrestation } from './etatprestation.entity';

@Controller('etatprestation')
export class EtatPrestationController {
  constructor(private readonly etatPrestationService: EtatPrestationService) {}

  @Get()
  findAll(): Promise<EtatPrestation[]> {
    return this.etatPrestationService.findAll();
  }
}