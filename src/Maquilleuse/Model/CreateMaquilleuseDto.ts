import {ApiModelProperty} from '@nestjs/swagger';
import { ManyToOne, OneToMany } from 'typeorm';
import { Photos } from '../../Photos/photos.entity';
import { Cities } from '../../Cities/cities.entity';
import { CreateCitiesDto } from '../../Cities/Model/CreateCitiesDto';
import { CreatePhotosDto } from '../../Photos/Model/CreatePhotosDto';
import { Expertise } from '../../Expertise/expertise.entity';
import { Business } from '../../Business/business.entity';

export class CreateMaquilleuseDto {

  @ApiModelProperty()
  readonly idMaquilleuse: number;

  @ApiModelProperty()
  readonly lastname: string;

  @ApiModelProperty()
  readonly firstname: string;

  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly emailAdress: string;

  @ApiModelProperty()
  readonly phone: string;

  @ApiModelProperty()
  readonly street: string;

  @ApiModelProperty()
  readonly slogan: string;

  @ApiModelProperty()
  readonly photo_profile: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  photosUrl: string;

  @ApiModelProperty()
  cities: string;

  @ApiModelProperty()
  expertises: string;

  @ApiModelProperty()
  business: string;

  @ApiModelProperty()
  movings: number;

  @ApiModelProperty()
  nbImages: number;

  @ApiModelProperty()
  idOffre: number;

}
