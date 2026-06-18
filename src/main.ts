import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PinoLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new PinoLoggerService();

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 8080;
  await app.listen(port);

  logger.log(
    `🚀 Servidor rodando em http://localhost:${port}`,
    'Bootstrap',
  );
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

