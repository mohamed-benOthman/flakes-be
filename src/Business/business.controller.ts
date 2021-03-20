import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {BusinessService} from './business.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Business} from './business.entity';

import {Request, Response} from 'express';

@ApiUseTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('')
  @ApiOperation({title: 'Lister tous les business'})
  @ApiResponse({ status: 200, description: 'Business trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de business trouvé.'})
  public async getAllBusiness(@Req() req: Request, @Res() res, @Session() session) {
    const business: Business[] = await this.businessService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(business);

  }

  @Get(':id')
  @ApiOperation({title: 'Lister les business dont l\'id est saisi'})
  @ApiResponse({ status: 200, description: 'Business trouvés.'})
  @ApiResponse({ status: 404, description: 'Pas de business trouvé.'})
  public async getBusinessFromId(@Param('id') id: number) {
    const photos: Business = await this.businessService.findBusinessById(id);
    return photos;
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
