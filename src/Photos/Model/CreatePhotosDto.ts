import {ApiModelProperty} from '@nestjs/swagger';

export class CreatePhotosDto {
  @ApiModelProperty()
  readonly url: string;
}
