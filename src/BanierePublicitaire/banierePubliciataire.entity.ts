import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  getRepository,
  RelationId,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { AppErrorEnum } from "../common/error/AppErrorEnum";
import { AppError } from "../common/error/AppError";
import { Regions } from "../Regions/regions.entity";
import { Maquilleuse } from "../Maquilleuse/maquilleuse.entity";
import { Cities } from "../Cities/cities.entity";
import { JsonProperty } from "json-typescript-mapper";

@Entity("banierePubliciataire")
export class BanierePublicitaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  idBaniere: number;

  @Column({ length: 900 })
  imageUrl: string;

  public static async addImage(imageUrl: string): Promise<BanierePublicitaire> {
    // const newExpertise = BanierePublicitaire.create();
    console.log(
      "tiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    );
    const baniere = new BanierePublicitaire();
    baniere.imageUrl = imageUrl;
    const res = await BanierePublicitaire.save(baniere);
    console.log(res);
    return Promise.resolve(baniere);
  }
  public static async deleteImage(id: number) {
    console.log(id);
    const image: BanierePublicitaire = await getRepository(BanierePublicitaire)
      .createQueryBuilder("banierepubliciataire")
      .where("banierepubliciataire.idBaniere= '" + id + "'")
      .getOne();
    console.log(image);
    if (image != null) {
      const deletedImage: BanierePublicitaire = await BanierePublicitaire.remove(
        image
      );
    } else {
      throw new AppError(AppErrorEnum.NO_EXPERTISE_IN_DB);
    }
  }
}
