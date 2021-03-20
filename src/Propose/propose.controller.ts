import { Controller, Get } from '@nestjs/common';
import { ProposeService } from './propose.service';
import { Propose } from './propose.entity';

@Controller('propose')
export class ProposeController {
  constructor(private readonly proposeService: ProposeService) {}

  @Get()
  findAll(): Promise<Propose[]> {
    return this.proposeService.findAll();
  }
}