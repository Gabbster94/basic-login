require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      cors: { origin: [process.env.FRONTEND_URL, process.env.DOCKER_FRONTEND] }
    }
  );

  const port = process.env.PORT || '3001';

  await app.listen(port);
  console.log("App listening on port: " + port);
}
bootstrap();
