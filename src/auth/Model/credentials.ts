import { ApiModelProperty } from '@nestjs/swagger';

export class Credentials {

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}