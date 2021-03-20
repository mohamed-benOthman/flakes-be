import { ApiModelProperty } from '@nestjs/swagger';

export class PassUserDto {
    @ApiModelProperty()
    readonly code: string;

    @ApiModelProperty()
    readonly newpassword: string;
}