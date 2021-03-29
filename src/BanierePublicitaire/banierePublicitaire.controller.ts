import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';

import {Request, Response} from 'express';
import {BanierePublicitaireService} from './banierePublicitaire.service';
import {Expertise} from '../Expertise/expertise.entity';

@ApiUseTags('banierePubliciataire')
@Controller('banierePubliciataire')
export class BanierePublicitaireController {
  constructor(private readonly banierePublicitaireService: BanierePublicitaireService) {}

  @Post('add')
  @ApiOperation({titile: 'Ajouter une une photo de baniere publicitaire'})
  @ApiResponse({status: 200, description: 'image ajoutee'})
  @ApiResponse({status: 400, descriptiom : 'cette image est deja existe'})
  public async addImage(@Req() req: Request ){
    const image = await this.banierePublicitaireService.addImage(req.body.imageUrl);
    return image;
  }

  @Get('all')
  @ApiOperation({titile: 'get les photos de baniere publicitaire'})
  @ApiResponse({status: 200, description: 'image ajoutee'})
  @ApiResponse({status: 400, descriptiom : 'cette image est deja existe'})
  public async getImages(@Req() req: Request, @Res() res, @Session() session){
    const images: Expertise[] = await this.banierePublicitaireService.findAll();
    return res
        .status(HttpStatus.OK)
        .send(images);
  }
  @Delete('/deleteBanierePublicitaire/:id')
  @ApiOperation({title: 'image deleted'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async deleteimage(@Param('id') id: number){

    return this.banierePublicitaireService.deleteImage(id);
  }

}
