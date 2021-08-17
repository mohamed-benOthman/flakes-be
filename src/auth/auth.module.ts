import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
    //  PassportModule.register({ defaultStrategy: 'jwt' }),
  //    PassportModule,
      JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 86400,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
