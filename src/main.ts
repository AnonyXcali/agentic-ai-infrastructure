import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppEnv } from './config/env.validation';

function getPort(configService: ConfigService<AppEnv, true>): number {
  return configService.getOrThrow('PORT', { infer: true });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = getPort(app.get(ConfigService<AppEnv, true>));

  await app.listen(port);
}
void bootstrap();
