import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposeService } from './propose.service';
import { ProposeController } from './propose.controller';
import { Propose } from './propose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propose])],
  providers: [ProposeService],
  controllers: [ProposeController],
})
export class ProposeModule {}