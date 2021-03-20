import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {CitiesService} from './cities.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Cities} from './cities.entity';

import {Request, Response} from 'express';
import { Departments } from '../Departments/departments.entity';

@ApiUseTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les villes'})
  @ApiResponse({ status: 200, description: 'Ville trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de Ville trouvé.'})
  public async getAllCities(@Req() req: Request, @Res() res, @Session() session) {
    const cities: Cities[] = await this.citiesService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(cities);

  }
  @Get(':name')
  @Get(':zipcode')
  @ApiOperation({title: 'Lister les départements commencant par le name saisi'})
  @ApiResponse({ status: 200, description: 'Villes trouvés.'})
  @ApiResponse({ status: 404, description: 'Pas de ville trouvé.'})
  public async getDepartFromName(@Param('name') name: string, @Param('zipcode') zipcode: string) {
    const cities: Cities[] = await this.citiesService.findCitiesByName(name, zipcode);
    return cities;
  }
}
