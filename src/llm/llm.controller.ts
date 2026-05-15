import { Controller, Post, Body } from '@nestjs/common';
import { extractCode } from 'src/utils';
import { LlmService } from './llm.service';
import { SshService } from 'src/ssh/ssh.service';

@Controller('llm')
export class LlmController {
  constructor(
    private readonly llmService: LlmService,
    private readonly sshService: SshService,
  ) {}

  @Post()
  async chat(@Body() body: { message: string }) {
    const rawCode = await this.llmService.chat(body.message);
    if (!rawCode) return 'no code was generated';
    const code = extractCode(rawCode);
    const encodedCode = Buffer.from(code, 'utf8').toString('base64');
    const filePath = `/tmp/llm-code-${Date.now()}.js`;
    const command = `
    echo '${encodedCode}' | base64 -d > ${filePath}
    node ${filePath}
    rm ${filePath}
    `.trim();
    const res = await this.sshService.runCommand(command);
    return res;
  }
}
