import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BanierePublicitaire } from './banierePubliciataire.entity';
import {BanierePublicitaireService} from './banierePublicitaire.service';
import {BanierePublicitaireController} from './banierePublicitaire.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BanierePublicitaire])],
  providers: [BanierePublicitaireService],
  controllers: [BanierePublicitaireController],
})
export class BanierePublicitaireModule {}
