import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessService } from '../../Business/business.service';


export class Competence{

  id: number;
  libelle: string;
  type: number;
  constructor(id: number, libelle: string, type: number) {
    this.id = id;
    this.libelle = libelle;
    this.type = type;
  }
  public getId(): number {
    return this.id;
  }

public setId(id: number){
    this.id = id;
}
  public getLibelle(): string {
    return this.libelle;
  }

  public setLibelle(libelle: string){
    this.libelle = libelle;
  }
  public getType(): number {
    return this.type;
  }

  public setType(type: number){
    this.type = type;
  }
}