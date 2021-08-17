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

  async addPhotosToMaquilleuse(maquilleuseId, url): Promise<Photos> {
    return await Photos.addPhotoToMaquilleuse(maquilleuseId, url);
  }

  async deleteById(id): Promise<Photos> {
    return await Photos.deletePhotosById(id);
  }

  async deletePhotoByUrl(url, idMaquilleuse): Promise<Photos> {
    return await Photos.deletePhotosByUrl(url, idMaquilleuse);
  }

}
