import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessService } from '../../Business/business.service';
import { ExpertiseService } from '../../Expertise/expertise.service';
import { ToolController } from './tool.controller';
import { Business } from '../../Business/business.entity';
import { Expertise } from '../../Expertise/expertise.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Business, Expertise])],
  providers: [BusinessService, ExpertiseService],
  controllers: [ToolController],
})
export class ToolModule {}