import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  Session,
  UseGuards
} from '@nestjs/common';
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
  @Delete('/deleteExpertise/:id')
  @ApiOperation({title: 'expertise deleted'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async deleteExpertise(@Param('id') id: number){

    return this.expertiseService.deleteExpertise(id);
  }

  @Post('add')
  @ApiOperation({titile:'Ajouter une expertises'})
  @ApiResponse({status:200, description: 'Expertise ajoutee'})
  @ApiResponse({status:400, descriptiom : 'cette expertise est deja existe'})
  public async addExpertise(@Req() req:Request ){
    const expertise = await this.expertiseService.addExpertise(req.body.lebelle);
    return expertise;
  }

  @Get(':id')
  @ApiOperation({title: 'Lister les expertises dont l\'id est saisi'})
  @ApiResponse({ status: 200, description: 'Expertises trouvées.'})
  @ApiResponse({ status: 404, description: 'Pas de expertise trouvée.'})
  public async getExpertiseFromId(@Param('id') id: number) {
    const expertise: Expertise = await this.expertiseService.findExpertiseById(id);
    return expertise;
  }

  @Put('/updateExpertise')
  @ApiOperation({title: 'modify the expertise choisie'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 400})
  public async updateExpertise(@Body() expertise: Expertise){
    return this.expertiseService.updateExpertise(expertise);
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
