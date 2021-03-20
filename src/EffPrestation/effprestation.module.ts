import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EffPrestationService } from './effprestation.service';
import { EffPrestationController } from './effprestation.controller';
import { EffPrestation } from './effprestation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EffPrestation])],
  providers: [EffPrestationService],
  controllers: [EffPrestationController],
})
export class EffPrestationModule {}