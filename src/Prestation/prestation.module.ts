import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestationService } from './prestation.service';
import { PrestationController } from './prestation.controller';
import { Prestation } from './prestation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestation])],
  providers: [PrestationService],
  controllers: [PrestationController],
})
export class PrestationModule {}