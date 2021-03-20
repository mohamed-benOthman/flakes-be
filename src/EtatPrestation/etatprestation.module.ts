import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtatPrestationService } from './etatprestation.service';
import { EtatPrestationController } from './etatprestation.controller';
import { EtatPrestation } from './etatprestation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EtatPrestation])],
  providers: [EtatPrestationService],
  controllers: [EtatPrestationController],
})
export class EtatprestationModule {}