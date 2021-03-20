import { ApiModelProperty } from '@nestjs/swagger';

export class LogUserDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}