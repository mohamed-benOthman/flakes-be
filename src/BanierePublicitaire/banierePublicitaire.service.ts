import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {BanierePublicitaire} from './banierePubliciataire.entity';
import {Expertise} from '../Expertise/expertise.entity';

@Injectable()
export class BanierePublicitaireService {
  constructor(
    @InjectRepository(BanierePublicitaire)
    private readonly banierePublicitaireRepository: Repository<BanierePublicitaire>,
  ) {}
  async addImage(imageUrl:string): Promise<BanierePublicitaire>{
    return await  BanierePublicitaire.addImage(imageUrl);
  }
  async findAll(): Promise<BanierePublicitaire[]> {
    return await this.banierePublicitaireRepository.find();
  }
  async deleteImage(id){
    return await BanierePublicitaire.deleteImage(id);
  }
/*  async findBusinessById(id): Promise<Business> {
    return await Business.findBusinessById(id);
  }*/

}
