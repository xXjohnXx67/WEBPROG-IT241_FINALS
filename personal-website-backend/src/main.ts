import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your Vercel frontend can talk to this backend
  app.enableCors(); 

  // Use the port provided by the hosting service (Render) or 3000 as a backup
  await app.listen(process.env.PORT || 3000);
}
bootstrap();