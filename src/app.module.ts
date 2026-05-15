import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { LlmModule } from './llm/llm.module';
import { SshModule } from './ssh/ssh.module';
import { CodeGenModule } from './code-gen/code-gen.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    LlmModule,
    SshModule,
    CodeGenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
