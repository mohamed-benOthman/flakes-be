import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { Candidat } from './candidat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidat])],
  providers: [CandidatService],
  controllers: [CandidatController],
})
export class CandidatModule {}