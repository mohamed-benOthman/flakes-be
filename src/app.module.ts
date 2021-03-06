import { Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection } from "typeorm";
import { PrestationModule } from "./Prestation/prestation.module";
import { EtatprestationModule } from "./EtatPrestation/etatprestation.module";
import { ProposeModule } from "./Propose/propose.module";
import { UtiliseOffreModule } from "./UtiliseOffre/utiliseOffre.module";
import { MaquilleuseModule } from "./Maquilleuse/maquilleuse.module";
import { OffreCommercialeModule } from "./OffreCommerciale/offrecommerciale.module";
import { EffPrestationModule } from "./EffPrestation/effprestation.module";
import { CandidatModule } from "./Candidat/candidat.module";
import { ClientModule } from "./Client/client.module";
import { DepartmentsModule } from "./Departments/departments.module";
import { RegionsModule } from "./Regions/regions.module";
import { CitiesModule } from "./Cities/cities.module";
import { PhotosModule } from "./Photos/photos.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./User/user.module";
import { ExpertiseModule } from "./Expertise/expertise.module";
import { BusinessModule } from "./Business/business.module";
import { ToolModule } from "./common/tool/tool.module";
import { FilesModule } from "./File/files.module";
import { AuthenticationMiddleware } from "./common/middleware/authentication.middleware";
import { MiddlewaresConsumer } from "@nestjs/common/interfaces/middlewares";
import { BanierePublicitaireModule } from "./BanierePublicitaire/banierePublicitaire.module";
import { PaymentMethodModule } from "./payment-method/payment-method.module";
import * as entities from "./index-entities";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "flakes5",
      // username: "yrros",
      // password: "7Quinoa.0",
      // database: "Flakes2",
      synchronize: false,
      migrationsRun: false,
      entities: ["src/**/**.entity{.ts,.js}"],

      /* migrations: [
          'src/migration/!**!/!*.ts'
        ],
        subscribers: [
          'src/subscriber/!**!/!*.ts'
        ],
        cli: {
          'entitiesDir': 'src/entity',
          'migrationsDir': 'src/migration',
          'subscribersDir': 'src/subscriber'
        }
*/
    }),
    // AuthModule,
    PrestationModule,
    EtatprestationModule,
    ProposeModule,
    UtiliseOffreModule,
    MaquilleuseModule,
    OffreCommercialeModule,
    EffPrestationModule,
    CandidatModule,
    ClientModule,
    DepartmentsModule,
    RegionsModule,
    BanierePublicitaireModule,
    CitiesModule,
    PhotosModule,
    ExpertiseModule,
    BusinessModule,
    ToolModule,
    FilesModule,
    UserModule,
    AuthModule,
    PaymentMethodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

/*export class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { path: '/**', method: RequestMethod.ALL }
    );
  }
}*/
