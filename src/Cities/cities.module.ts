import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { Cities } from './cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {}