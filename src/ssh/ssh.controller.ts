import { Controller, Post, Body } from '@nestjs/common';
import { SshService } from './ssh.service';

@Controller('ssh')
export class SshController {
  constructor(private readonly sshService: SshService) {}
  @Post()
  async handleRunCommand(@Body() body: { command: string }) {
    const { command } = body;
    return await this.sshService.runCommand(command);
  }
}
