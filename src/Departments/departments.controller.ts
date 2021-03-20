import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {DepartmentsService} from './departments.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Departments} from './departments.entity';

import {Request, Response} from 'express';

@ApiUseTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les départements'})
  @ApiResponse({ status: 200, description: 'Département trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de département trouvé.'})
  public async getAllDepartement(@Req() req: Request, @Res() res, @Session() session) {
    const departments: Departments[] = await this.departmentsService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(departments);

  }

  @Get(':name')
  @ApiOperation({title: 'Lister les départements commencant par le name saisi'})
  @ApiResponse({ status: 200, description: 'Départements trouvés.'})
  @ApiResponse({ status: 404, description: 'Pas de département trouvé.'})
  public async getDepartFromName(@Param('name') name: string) {
  console.log('Controller Name:'+name);
    const departments: Departments[] = await this.departmentsService.findDepartmentsByName(name);
  /*.catch((err) => {
    console.error(err);
  });*/
    return departments;
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }
*/
}
