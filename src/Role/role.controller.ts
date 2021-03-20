import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {CategorieService} from './categorie.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Role} from './role.entity';

import {Request, Response} from 'express';

@ApiUseTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('')
  @ApiOperation({title: 'Lister toutes les role'})
  @ApiResponse({ status: 200, description: 'Role trouvée.'})
  @ApiResponse({ status: 404, description: 'Pas de role trouvée.'})
  public async getAllRole(@Req() req: Request, @Res() res, @Session() session) {
    const role: Role[] = await this.roleService.findAll();
    return res
      .status(HttpStatus.OK)
      .send(role);

  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({title: 'Lister les roles dont l\'id est saisi'})
  @ApiResponse({ status: 200, description: 'Role trouve.'})
  @ApiResponse({ status: 404, description: 'Pas de role trouvée.'})
  public async getRoleFromId(@Param('id') id: number) {
    const role: Role = await this.roleService.findRoleById(id);
    return role;
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
