import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {RegionsService} from './regions.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Regions} from './regions.entity';

import {Request, Response} from 'express';
import { Departments } from '../Departments/departments.entity';

@ApiUseTags('regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les regions'})
  @ApiResponse({ status: 200, description: 'Region trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de Region trouvé.'})
  public async getAllRegion(@Req() req: Request, @Res() res, @Session() session) {
    const regions: Regions[] = await this.regionsService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(regions);

  }

  @Get(':name')
  @ApiOperation({title: 'Lister les regions commençant par le name saisi'})
  @ApiResponse({ status: 200, description: 'Regions trouvées.'})
  @ApiResponse({ status: 404, description: 'Pas de region trouvée.'})
  public async getRegionFromName(@Param('name') name: string) {
    const regions: Regions[] = await this.regionsService.findRegionsByName(name);
    return regions;
  }


}
