import {ApiModelProperty} from '@nestjs/swagger';

export class EnvoiMailDto {

    @ApiModelProperty()
    readonly loginSender: string;

    @ApiModelProperty()
    readonly emailSender: string;

    @ApiModelProperty()
    readonly phoneSender: string;

    @ApiModelProperty()
    readonly idGift: number;

    @ApiModelProperty()
    readonly message: string;
}