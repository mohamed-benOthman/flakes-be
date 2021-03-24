import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import {UserService} from './user.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {User} from './user.entity';
import {Role} from '../Role/role.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {LoginUserDto} from './Model/login-user.dto';
import {PassUserDto} from './Model/PassUserDto';
import {LogUserDto} from './Model/LogUserDto';
import {EnvoiMailDto} from './Model/EnvoiMailDto'
import {ToolService} from '../common/tool/tool.service';

import {Request, Response} from 'express';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({title: 'Lister tous les user'})
  @ApiResponse({ status: 200, description: 'User trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de user trouvé.'})
  public async getAllUser() {
   // const user: User[] = await this.userService.findAll();
    return await this.userService.findAll()
     /* .status(HttpStatus.OK)
      .send(user)*/
      .catch((err) => {
        console.error(err);
        MyLogger.error(err);
      });
  }

  @Get(':id')
  @ApiOperation({title: 'Lister les business dont l\'id est saisi'})
  @ApiResponse({ status: 200, description: 'Business trouvés.'})
  @ApiResponse({ status: 404, description: 'Pas de business trouvé.'})
  public async getBusinessFromId(@Param('id') id: number) {
    const photos: Business = await this.businessService.findBusinessById(id);
    return photos;
  }


    @Get('activate/:code')
    @ApiOperation({title: 'Activate user'})
    @ApiResponse({ status: 200, description: 'User activé'})
    @ApiResponse({ status: 500, description: 'Erreur d\'activation'})
    public async activateUser(@Param('code') code: string,@Res() res: Response) {
       const result = await this.userService.activateUser(code);

        res.redirect('http://82.165.253.223:3050/confirm/confirm.html');
     //   return result;
    }


    @Get('forgotpassword/:email')
    @ApiOperation({title: 'forgotpassword user'})
    @ApiResponse({ status: 200, description: 'Reinitialisation password activé'})
    @ApiResponse({ status: 500, description: 'Erreur d\'activation'})
    public async forgotpassword(@Param('email') email: string) {
       // const result = await this.userService.forgotpassword(code);
        const _user = await this.userService.findUserByMail(email);

        console.log("Forhotpassword:"+email);

        this.userService.forgotPasswordMail(_user.idUser,email,_user.login,_user.code);
       // res.redirect('http://82.165.253.223:3000/confirm/forgotpass.html');
        //   return result;
    }

    @Get('resetpassword/:code')
    @ApiOperation({title: 'resetpassword user'})
    @ApiResponse({ status: 200, description: 'Reinitialisation password activé'})
    @ApiResponse({ status: 500, description: 'Erreur d\'activation'})
    public async resetpassword(@Param('code') code: string,@Res() res: Response) {
        // const result = await this.userService.forgotpassword(code);
      //  const _user = await this.userService.findUserByMail(email);


        //this.userService.forgotPasswordMail(_user.code,email,_user.login);
         res.redirect('http://82.165.253.223:3050/confirm/forgotpass.html?eso='+code);
        //   return result;
    }


    @Post('validNewPassword')
    @ApiOperation({title: 'Change pass user'})
    @ApiResponse({ status: 200, description: 'Processing succedeed'})
    @ApiResponse({ status: 500, description: 'Processing failed'})

    public async validNewPassword(@Body() passUserDto: PassUserDto,@Res() res: Response): Promise<UserRO> {
       console.log('Modifi pass 1 code:'+passUserDto.code+' pass:'+passUserDto.newpassword);
        const _user = await this.userService.findUserByCode(passUserDto.code);
        console.log('Modifi pass 2');

        const _u = await this.userService.updateUserPass(_user,passUserDto.newpassword);
      console.log('Modifi Done : redirect');
        res.redirect('http://82.165.253.223:3050/confirm/confirmepass.html');
    }

    @Post('login')
    @ApiOperation({title: 'Login user and get the token'})
    @ApiResponse({ status: 200, description: 'Processing succedeed'})
    @ApiResponse({ status: 500, description: 'Processing failed'})

    public async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
     // console.log('1');
      const _user = await this.userService.findOne(loginUserDto);
     // console.log('2');
      const bcrypt = require('bcrypt');
     // console.log('3');
      const errors = {User: ' not found'};
        const passFailed = {User: ' pass check failed'};
        if (!_user) throw new HttpException({errors}, 401);
     // console.log('4');

      console.log('pass:'+_user.pass+' loginUserDto.password:'+loginUserDto.password+
            ' bcrypt:'+ToolService.getBCryptHash(loginUserDto.password));
        if(bcrypt.compareSync(loginUserDto.password, _user.pass)===false){
       // if(ToolService.getHashMD5(loginUserDto.password)!==_user.pass){
           return 1401;

        }
        console.log("id User:"+_user.idUser);
        console.log("email User:"+_user.email);
      console.log("username User:"+_user.login);
      const userna : string =_user.login;
      const role : string =_user.roles;
      console.log('role:'+_user.roles);
        const token = await this.userService.generateJWTLog(_user);
        const {email, username} = _user;
        const user = {email, token,userna,role};
        return {user}
    }

    @Post('gettoken')
    @ApiOperation({title: 'Login user and get the token'})
    @ApiResponse({ status: 200, description: 'Processing succedeed'})
    @ApiResponse({ status: 500, description: 'Processing failed'})

    public async gettoken(@Body() loginUserDto: LogUserDto): Promise<UserRO> {
    console.log('getToken');
        const _user = await this.userService.findUserByEmail(loginUserDto.email);

        const bcrypt = require('bcrypt');

        const errors = {User: ' not found'};
        const passFailed = {User: ' pass check failed'};
        if (!_user) throw new HttpException({errors}, 401);


        console.log('pass:'+_user.pass+' loginUserDto.password:'+loginUserDto.password+
            ' bcrypt:'+ToolService.getBCryptHash(loginUserDto.password));
        if(bcrypt.compareSync(loginUserDto.password, _user.pass)===false){
            // if(ToolService.getHashMD5(loginUserDto.password)!==_user.pass){
            throw new HttpException({passFailed}, 401);

        }
        console.log("id User:"+_user.idUser);
        console.log("email User:"+_user.email);
      console.log("role User:");
        if(_user.roles) {
          console.log("2 Entry role User");
          const userole: Role =_user.roles;
          console.log("role User:" + userole.idRole);

        }
        const token = await this.userService.generateJWTLog(_user);
        _user.code=token;
        const user_f: User = await User.save(_user);
        const {email, username} = _user;
        const user = {email, token, username};
        return {user}
    }

    @Post('message')
    @ApiOperation({title: 'Envoyer Message  '})
    @ApiResponse({ status: 200, description: 'Processing succedeed'})
    @ApiResponse({ status: 500, description: 'Processing failed'})

    public async envoyerMessage(@Body() envoiMail: EnvoiMailDto) {
        console.log("Envoyer Message:Je suis entré");


        const _user = await this.userService.envoiMail(envoiMail);

    }


    @Post('getBecryptedPassword')
    @ApiOperation({title: 'Login user and get the token'})
    @ApiResponse({ status: 200, description: 'Processing succedeed'})
    @ApiResponse({ status: 500, description: 'Processing failed'})

    public async getBycryptedPassword(@Req() req) {
        console.log("Envoyer Message:Je suis entré");
        return ToolService.getBCryptHash(req.body.password);

    }
  /*
    @Get(':id')
    findOne(@Param('id') id: string): Cat {
      return this.catsService.findOne(+id);
    }
  */
}
