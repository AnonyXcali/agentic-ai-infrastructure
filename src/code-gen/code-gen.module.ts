import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CodeGenService } from './code-gen.service';
import { CodeGenController } from './code-gen.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'code-execution',
    }),
  ],
  providers: [CodeGenService],
  controllers: [CodeGenController],
})
export class CodeGenModule {}
