import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Middleware, NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../common/config';
import { sactive } from '../common/config';
import { UserService } from './user.service';


/*
This middleware class allow to apply security strategy
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService,
                ) {}

    resolve(): (req: Request, res: Response, next: NextFunction) => void {

        return async (req: Request, res: Response, next: NextFunction) => {
            console.log('test header:'+req.headers.authorization);
		    console.log('test Middlware');

            if (req.headers.authorization==undefined) {
                console.log('test Middlware:header undefined');
                throw new HttpException('Header not found.', HttpStatus.UNAUTHORIZED);
            }

            console.log('test Header auth passed');
		    //Test header authorization
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Token') {

                console.log('test Header Token passed');
                const tabHeaderAuth = (req.headers.authorization as string).split(' ');
                const token = tabHeaderAuth[1];

                console.log('Ge token OK Token:'+token);
               /* const decoded: any = jwt.verify(token, sactive, function(err, decoded) {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("decoded:"+decoded)
                    }
                });*/

                const decoded: any = jwt.verify(token, sactive);


                console.log('Decoded:'+decoded+" id:"+decoded.id);
                //console.log("decoded.id"+decoded.id);
                const user = await this.userService.findById(decoded.id);

                console.log("remontee apres user:"+user);
                console.log("remontee apres code:"+user.code);
                if(user==undefined){
                    throw new HttpException('unauthorized user action.', HttpStatus.UNAUTHORIZED);
                }
                if (!user) {
                    throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
                }

                req.user = user.user;
                console.log("juste avt lancement");
                next();

            } else {
                throw new HttpException('Not authorized. Token not found', HttpStatus.UNAUTHORIZED);

            }
        };
    }
}
