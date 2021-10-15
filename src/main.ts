import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as configs from 'config';

declare const module : any;

async function bootstrap() {
  const logger = new Logger();
  const serverConfig = configs.get('server'); 

  const app = await NestFactory.create(AppModule);


  //swagger 추가
  const config = new DocumentBuilder()
    .setTitle('Select API')
    .setDescription('Dev Select Docs')
    .setVersion('1.0')
    .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apis', app, document);
    
    
    await app.listen(serverConfig.port);
    Logger.log(`Application running on port ${serverConfig.port}`);

    if (module.hot){
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
}
bootstrap();