import { validateEnv } from './env.validation';

describe('validateEnv', () => {
  it('returns parsed values for a valid environment', () => {
    expect(
      validateEnv({
        PORT: '4500',
        OPENAI_API_KEY: 'test-key',
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_PORT: '2222',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toEqual({
      PORT: 4500,
      OPENAI_API_KEY: 'test-key',
      OPENAI_MODEL: 'gpt-4o-mini',
      VAST_BASE_URL: 'http://localhost:8080/v1',
      VAST_AUTH_URL: 'http://localhost:8080/auth',
      VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
      SSH_HOST: 'localhost',
      SSH_PORT: 2222,
      SSH_USERNAME: 'test-user',
      SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
    });
  });

  it('defaults PORT to 3000 when not provided', () => {
    expect(
      validateEnv({
        OPENAI_API_KEY: 'test-key',
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toMatchObject({
      PORT: 3000,
      SSH_PORT: 22,
    });
  });

  it('fails when OPENAI_API_KEY is missing', () => {
    expect(() =>
      validateEnv({
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toThrow('Environment variable OPENAI_API_KEY is required');
  });

  it('fails when OPENAI_MODEL is missing', () => {
    expect(() =>
      validateEnv({
        OPENAI_API_KEY: 'test-key',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toThrow('Environment variable OPENAI_MODEL is required');
  });

  it('fails when VAST_BASE_URL is missing', () => {
    expect(() =>
      validateEnv({
        OPENAI_API_KEY: 'test-key',
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toThrow('Environment variable VAST_BASE_URL is required');
  });

  it('fails when SSH_HOST is missing', () => {
    expect(() =>
      validateEnv({
        OPENAI_API_KEY: 'test-key',
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_USERNAME: 'test-user',
        SSH_PRIVATE_KEY_PATH: '/tmp/test-key',
      }),
    ).toThrow('Environment variable SSH_HOST is required');
  });

  it('fails when SSH_PRIVATE_KEY_PATH is missing', () => {
    expect(() =>
      validateEnv({
        OPENAI_API_KEY: 'test-key',
        OPENAI_MODEL: 'gpt-4o-mini',
        VAST_BASE_URL: 'http://localhost:8080/v1',
        VAST_AUTH_URL: 'http://localhost:8080/auth',
        VAST_MODEL: 'Qwen/Qwen2.5-Coder-7B-Instruct',
        SSH_HOST: 'localhost',
        SSH_USERNAME: 'test-user',
      }),
    ).toThrow('Environment variable SSH_PRIVATE_KEY_PATH is required');
  });
});
