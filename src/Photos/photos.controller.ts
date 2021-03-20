import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {PhotosService} from './photos.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Photos} from './photos.entity';

import {Request, Response} from 'express';

@ApiUseTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les photos'})
  @ApiResponse({ status: 200, description: 'Photo trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de photo trouvé.'})
  public async getAllPhotos(@Req() req: Request, @Res() res, @Session() session) {
    const photos: Photos[] = await this.photosService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(photos);

  }

  @Get(':id')
  @ApiOperation({title: 'Lister les photos commencant par le name saisi'})
  @ApiResponse({ status: 200, description: 'Photos trouvés.'})
  @ApiResponse({ status: 404, description: 'Pas de photo trouvé.'})
  public async getPhotoFromId(@Param('id') id: number) {
    const photos: Photos = await this.photosService.findPhotosById(id);
    return photos;
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
