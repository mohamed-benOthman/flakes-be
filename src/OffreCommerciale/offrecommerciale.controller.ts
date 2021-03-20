import { Controller, Get } from '@nestjs/common';
import { OffreCommercialeService } from './offrecommerciale.service';
import { OffreCommerciale } from './offrecommerciale.entity';

@Controller('OffreCommerciale')
export class OffreCommercialeController {
  constructor(private readonly offreCommercialeService: OffreCommercialeService) {}

  @Get()
  findAll(): Promise<OffreCommerciale[]> {
    return this.offreCommercialeService.findAll();
  }
}