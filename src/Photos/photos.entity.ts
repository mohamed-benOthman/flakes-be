import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository, RelationId } from 'typeorm';
import {AppErrorEnum} from '../common/error/AppErrorEnum';
import {AppError} from '../common/error/AppError';
import { Regions } from '../Regions/regions.entity';
import { Maquilleuse } from '../Maquilleuse/maquilleuse.entity';
import { Cities } from '../Cities/cities.entity';
import { JsonProperty } from 'json-typescript-mapper';
import { CreateMaquilleuseDto } from '../Maquilleuse/Model/CreateMaquilleuseDto';


@Entity('photos')
export class Photos extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  url: string;


  @JsonProperty('maquilleuse')
  @ManyToOne(type => Maquilleuse, maquilleuse => maquilleuse.photosUrl, { nullable: false, onDelete: 'CASCADE' })
  public maquilleuse: Maquilleuse;



  public static async findAll(): Promise<Photos[]> {

    const photos: Photos[] = await Photos.find();
    if (photos.length > 0) {
      return Promise.resolve(photos);
    } else {
      throw new AppError(AppErrorEnum.NO_PHOTOS_IN_DB);
    }

  }
  public static async createPhoto(url: string): Promise <Photos>{
    let phot: Photos;
    phot = new Photos();
    phot.url = url;
    const resId: Photos = await Photos.save(phot).then((acc) => {
      console.log(acc);
      return acc;
    })
      .catch((err) => {
        throw new AppError(AppErrorEnum.ERR_CREATE_PHOTO);
      console.log(err);
    });
    return resId;
    }
  public static async findPhotosById(idphoto): Promise<Photos> {


     console.log('requete:'+sql);*/
    console.log(idphoto);
    const photos: Photos = await getRepository(Photos)
      .createQueryBuilder('photos')
      .where('photos.id=' + idphoto)
      .getOne();
    if (photos != null) {
      return Promise.resolve(photos);
    } else {
      throw new AppError(AppErrorEnum.NO_PHOTOS_IN_RESULT);
    }

  }
  public static async deletePhotosById(idphoto): Promise<Photos> {

    const photos: Photos = await getRepository(Photos)
        .createQueryBuilder('photos')
        .where('photos.id=' + idphoto)
        .getOne();
    if (photos != null) {
      let photoDeleted: Photos = await Photos.remove(photos);
    } else {
      throw new AppError(AppErrorEnum.NO_PHOTOS_IN_RESULT);
    }

  }

}
