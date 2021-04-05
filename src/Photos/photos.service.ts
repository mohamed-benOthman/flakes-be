import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photos } from './photos.entity';
import {IPhotosService} from './IPhotosService';

@Injectable()
export class PhotosService implements IPhotosService{
  constructor(
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
  ) {}

  async findAll(): Promise<Photos[]> {
    return await this.photosRepository.find();
  }

  async findPhotosById(id): Promise<Photos> {
    return await Photos.findPhotosById(id);
  }

  async deleteById(id): Promise<Photos> {
    return await Photos.deletePhotosById(id);
  }

}
