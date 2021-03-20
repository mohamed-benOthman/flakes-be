import { Controller, Get } from '@nestjs/common';
import { UtiliseOffreService } from './utiliseOffre.service';
import { UtiliseOffre } from './utiliseOffre.entity';

@Controller('utiliseOffre')
export class UtiliseOffreController {
  constructor(private readonly utiliseOffreService: UtiliseOffreService) {}

  @Get()
  findAll(): Promise<UtiliseOffre[]> {
    return this.utiliseOffreService.findAll();
  }
}