import {ApiModelProperty} from '@nestjs/swagger';

export class CreateCitiesDto {
  @ApiModelProperty()
  readonly code: number;

  @ApiModelProperty()
  readonly city: string;
}
