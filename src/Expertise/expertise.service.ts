import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expertise } from './expertise.entity';
import {IExpertiseService} from './IExpertiseService';
import {Maquilleuse} from "../Maquilleuse/maquilleuse.entity";

@Injectable()
export class ExpertiseService implements IExpertiseService{
  constructor(
    @InjectRepository(Expertise)
    private readonly expertiseRepository: Repository<Expertise>,
  ) {}

  async findAll(): Promise<Expertise[]> {
    return await this.expertiseRepository.find();
  }

  async addExpertise(lebelle:string): Promise<Expertise>{
    return await Expertise.addExpertise(lebelle);
  }
  async findExpertiseById(id): Promise<Expertise> {
    return await Expertise.findExpertiseById(id);
  }
  async deleteExpertise(id){
    return await Expertise.deleteExpertise(id);
  }
  async updateExpertise(expertise: Expertise): Promise<Expertise> {
    return await Expertise.updateExpertise(expertise);
  }

}
