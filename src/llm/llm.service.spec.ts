import { ConfigService } from '@nestjs/config';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';
import { AppEnv } from '../config/env.validation';
import { buildVllmOpenAIBaseURL, LlmService } from './llm.service';

type MockChatClient = {
  chat: {
    completions: {
      create: jest.Mock<
        Promise<{ choices: Array<{ message: { content: string | null } }> }>,
        [ChatCompletionCreateParamsNonStreaming]
      >;
    };
  };
};

describe('LlmService', () => {
  it('normalizes a root Vast URL for OpenAI SDK chat completions', () => {
    expect(buildVllmOpenAIBaseURL('http://localhost:8080')).toBe(
      'http://localhost:8080/v1',
    );
  });

  it('keeps a v1 Vast URL unchanged for OpenAI SDK chat completions', () => {
    expect(buildVllmOpenAIBaseURL('http://localhost:8080/v1')).toBe(
      'http://localhost:8080/v1',
    );
  });

  it('sends a minimal SDK chat completion request', async () => {
    const create = jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: 'console.log("ok")',
          },
        },
      ],
    }) as MockChatClient['chat']['completions']['create'];

    const service = new LlmService(
      new ConfigService<AppEnv, true>({
        VAST_MODEL: 'test-model',
      }),
    );

    (service as unknown as { client: MockChatClient }).client = {
      chat: {
        completions: {
          create,
        },
      },
    };

    await expect(service.chat('Write code')).resolves.toBe('console.log("ok")');

    expect(create).toHaveBeenCalledTimes(1);
    const requestBody = create.mock.calls[0][0];
    const systemMessage = requestBody.messages[0];

    expect(requestBody.model).toBe('test-model');
    expect(requestBody.messages).toHaveLength(2);
    expect(systemMessage.role).toBe('system');
    expect(typeof systemMessage.content).toBe('string');
    expect(requestBody.messages[1]).toEqual({
      role: 'user',
      content: 'Write code',
    });
    expect(requestBody).not.toHaveProperty('structured_outputs');
    expect(requestBody).not.toHaveProperty('tools');
    expect(requestBody).not.toHaveProperty('response_format');
  });
});
