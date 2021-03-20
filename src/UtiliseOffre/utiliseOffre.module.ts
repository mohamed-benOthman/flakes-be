import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtiliseOffreService } from './utiliseOffre.service';
import { UtiliseOffreController } from './utiliseOffre.controller';
import { UtiliseOffre } from './utiliseOffre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UtiliseOffre])],
  providers: [UtiliseOffreService],
  controllers: [UtiliseOffreController],
})
export class UtiliseOffreModule {}