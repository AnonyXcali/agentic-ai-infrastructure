import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { AppEnv } from '../config/env.validation';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { SshService } from 'src/ssh/ssh.service';

@Module({
  providers: [
    {
      provide: OpenAI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnv, true>) =>
        new OpenAI({
          apiKey: configService.getOrThrow<string>('OPENAI_API_KEY', {
            infer: true,
          }),
        }),
    },
    LlmService,
    SshService,
  ],
  controllers: [LlmController],
  exports: [LlmService],
})
export class LlmModule {}
