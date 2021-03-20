import { CreateCitiesDto } from '../../Cities/Model/CreateCitiesDto';
export interface MaquilleuseI {
  readonly lastName: string;
  readonly firstName: string;
  readonly username: string;
  readonly emailAdress: string;
  readonly phone: string;
  readonly street: string;
  readonly slogan: string;
  readonly photo_profile: string;
  readonly password: string;
  photosUrl: any;
  zipCode: CreateCitiesDto;
  expertises: any;
  business: any;
}