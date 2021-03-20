import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {ExpertiseService} from './expertise.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Expertise} from './expertise.entity';

import {Request, Response} from 'express';

@ApiUseTags('expertise')
@Controller('expertise')
export class ExpertiseController {
  constructor(private readonly expertiseService: ExpertiseService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les expertises'})
  @ApiResponse({ status: 200, description: 'Expertise trouvée.'})
  @ApiResponse({ status: 404, description: 'Pas de expertise trouvée.'})
  public async getAllExpertise(@Req() req: Request, @Res() res, @Session() session) {
    const expertises: Expertise[] = await this.expertiseService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(expertises);

  }

  @Get(':id')
  @ApiOperation({title: 'Lister les expertises dont l\'id est saisi'})
  @ApiResponse({ status: 200, description: 'Expertises trouvées.'})
  @ApiResponse({ status: 404, description: 'Pas de expertise trouvée.'})
  public async getExpertiseFromId(@Param('id') id: number) {
    const expertise: Expertise = await this.expertiseService.findExpertiseById(id);
    return expertise;
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
