import { Module,RequestMethod,MiddlewareConsumer,NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaquilleuseService } from './maquilleuse.service';
import { MaquilleuseController } from './maquilleuse.controller';
import { Maquilleuse } from './maquilleuse.entity';
import {UserService} from '../User/user.service';
import { User } from '../User/user.entity';
import { AuthMiddleware } from '../User/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Maquilleuse,User])],
  providers: [MaquilleuseService,UserService],
  controllers: [MaquilleuseController],
})
export class MaquilleuseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'maquilleuse/modify', method: RequestMethod.POST},
      );
  }
}
