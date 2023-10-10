import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser"
import { ValidationPipe } from '@nestjs/common';
const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
      .setTitle('Muddatli tolov')
      .setDescription('mini Project for term payment')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJs, Postgres, Sequelize, JWT, Swagger')
      .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
    app.use(cookieParser())
    await app.listen(3000, () => {
      console.log(`server is running on ${3000} port`)
    });

  } catch (error) {
    console.log(error);
  }

}
start()
