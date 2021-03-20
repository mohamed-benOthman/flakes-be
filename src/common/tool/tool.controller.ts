import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {BusinessService} from '../../Business/business.service';
import {ExpertiseService} from '../../Expertise/expertise.service';
import {Business} from '../../Business/business.entity';
import {Expertise} from '../../Expertise/expertise.entity';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Request, Response} from 'express';
import {AppAuthGuard} from '../../Auth/AppAuthGuard';
import { IErrorMessage } from '../../common/error/IErrorMessage';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
import { AppSearchingTypeEnum } from '../../common/error/AppSearchingTypeEnum';
import { Competence } from '../Data/Competence';
@ApiUseTags('tool')
@Controller('tool')
export class ToolController {
  constructor(private readonly businessService: BusinessService, private readonly expertiseService: ExpertiseService) {}

  @Get()
  @ApiOperation({title: 'Get list of expertise et buiness'})
  @ApiResponse({ status: 200, description: 'Expertise ou Business trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de Business ou d\'expertise trouvé.'})
  public async getAllBusinessExpertise() {
    const  business: Business[] = await this.businessService.findAll();
    const  expertises: Expertise[] = await this.expertiseService.findAll();
    const competence: Competence[] = new Array(0);
    for (const bu of business) {
      competence.push(new Competence(bu.idBusiness, bu.libelle, 1));
    }

    for (const ex of expertises) {
      competence.push(new Competence(ex.idExpertise, ex.libelle, 2));
    }
    return competence;

  }



}
