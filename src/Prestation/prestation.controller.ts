import { Controller, Get } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { Prestation } from './prestation.entity';

@Controller('prestation')
export class PrestationController {
  constructor(private readonly PrestationService: PrestationService) {}

  @Get()
  findAll(): Promise<Prestation[]> {
    return this.PrestationService.findAll();
  }
}