import { Injectable, CanActivate, ExecutionContext,HttpException,HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {User} from '../User/user.entity'
import { SECRET } from '../common/config';
import { UserService } from '../User/user.service';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../User/Model/user-role.enum'
import { sactive } from '../common/config';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly _reflector: Reflector,
                private readonly userService: UserService,) {}


    canActivate(context: ExecutionContext): boolean {

        console.log("error guard user");
        const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true;
        }

        console.log("test roles");
        const req = context.switchToHttp().getRequest();

       // const user: User = request.user;

        console.log("test requests req.headers:"+req.headers.authorization);
        if ((req.headers.authorization!=undefined) &&
          req.headers.authorization
          && (req.headers.authorization as string).split(' ')[0] === 'Token') {

            console.log('entré dans test');
            const tabHeaderAuth = (req.headers.authorization as string).split(' ');
            const token = tabHeaderAuth[1];
            console.log("SECRET :"+SECRET+" token:"+token);
            const decoded: any = jwt.verify(token, sactive);

         /*    const decoded: any = jwt.verify(token, sactive, function(err, decoded) {
              if(err){
                  console.log(err)
              }else{
                  console.log("decoded:"+decoded)
              }
          });*/

           // const user:User =  User.findUserByIdWithRole(decoded.id);

            //console.log("remontee apres user");

            if (!token) {
                throw new HttpException('Token not found.', HttpStatus.UNAUTHORIZED);
            }
            //role 1: User 2:Admin
            const hasRole = () => roles.indexOf((decoded.role===2)?UserRole.Admin:(decoded.role===1)?UserRole.User:'') >= 0;


            console.log('OK decoded decoded.role:'+decoded);
            //console.log('user.role.idrole:'+user.role.idRole);
            console.log('hasRole():'+hasRole());
            if (decoded.id && decoded.role && hasRole()) {
                return true;
            }

            throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);


        } else {
            console.log('Header sync not founded');
           // throw new HttpException('Not authorized. Incorrect format', HttpStatus.UNAUTHORIZED);
            return false;
        }

        console.log('Fin de Guard');
    return true;

    }
}
