import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DispatchError } from "./common/filter/DispatchError";
import * as session from "express-session";
import * as passport from "passport";
import * as express from "express";
import * as cors from "cors";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "keyboard cat",
      name: "sess-tutorial",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new DispatchError());
  const options = new DocumentBuilder()
    .setTitle("User Session Tutorial")
    .setDescription("Basic Auth and session management")
    .setVersion("1.0")
    .addTag("nestjs")
    .addBearerAuth("Authorization", "header")
    .build();

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.use(express.static(join(process.cwd(), "html/adminFlakes/")));
  app.setViewEngine("hbs");

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.use("/uploads", express.static("./uploads"));
  await app.listen(3050);
}
bootstrap()
  .then(() => {
    console.log("Application is listening on port 3050");
  })
  .catch((err) => {
    console.error(err);
  });
