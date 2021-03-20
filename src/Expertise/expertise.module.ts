import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertiseService } from './expertise.service';
import { ExpertiseController } from './expertise.controller';
import { Expertise } from './expertise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expertise])],
  providers: [ExpertiseService],
  controllers: [ExpertiseController],
})
export class ExpertiseModule {}