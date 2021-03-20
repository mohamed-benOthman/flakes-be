import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffreCommercialeService } from './offrecommerciale.service';
import { OffreCommercialeController } from './offrecommerciale.controller';
import { OffreCommerciale } from './offrecommerciale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OffreCommerciale])],
  providers: [OffreCommercialeService],
  controllers: [OffreCommercialeController],
})
export class OffreCommercialeModule {}