import { Controller, Get } from '@nestjs/common';
import { EffPrestationService } from './effprestation.service';
import { EffPrestation } from './effprestation.entity';

@Controller('effprestation')
export class EffPrestationController {
  constructor(private readonly effPrestationService: EffPrestationService) {}

  @Get()
  findAll(): Promise<EffPrestation[]> {
    return this.effPrestationService.findAll();
  }
}