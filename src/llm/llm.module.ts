import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { SshService } from 'src/ssh/ssh.service';

@Module({
  providers: [LlmService, SshService],
  controllers: [LlmController],
  exports: [LlmService],
})
export class LlmModule {}
