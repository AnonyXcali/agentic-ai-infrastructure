# Agentic AI Infrastructure

Minimal infrastructure for generating TypeScript-compatible JavaScript and running it on a remote server over SSH.

This project is a small NestJS backend that accepts a prompt, asks an OpenAI-compatible model provider to produce executable JavaScript, copies that code to a configured remote machine, executes it there with Node.js, and returns the remote stdout.

## Objective

The goal is to provide the smallest useful backend for remote TypeScript execution experiments:

- expose an HTTP API for code-generation requests;
- connect to a remote execution host over SSH;
- run generated TypeScript-compatible JavaScript in an isolated remote environment;
- keep model provider credentials, SSH credentials, and execution host details outside the source code.

The generated code is expected to be plain JavaScript that can run directly with `node`. TypeScript-only syntax such as type annotations, interfaces, enums, and generics should not be emitted by the model.

## Architecture

The main flow is handled by `POST /llm`:

1. The request body supplies a natural-language prompt in `message`.
2. The LLM service asks the configured OpenAI-compatible/vLLM provider for executable JavaScript.
3. The controller encodes the generated code, writes it to a temporary file on the remote server, and runs it with Node.js through SSH.
4. The API returns stdout from the remote command.

There is also a lower-level `POST /ssh` endpoint that runs a supplied command through the configured SSH connection.

## Configuration

Copy the example environment file and fill in local values:

```bash
pnpm install
cp .env.example .env
```

Required environment variables:

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Required by current env validation. Use a placeholder only if the active flow uses the Vast/vLLM cookie auth path. |
| `OPENAI_MODEL` | Required by current env validation. Use the default placeholder unless the OpenAI client path needs it. |
| `VAST_BASE_URL` | Base URL for the OpenAI-compatible/vLLM API. It may be either the server root or a `/v1` URL. |
| `VAST_AUTH_URL` | URL used to obtain the Vast/vLLM auth cookie. Do not commit real tokens. |
| `VAST_MODEL` | Model name to pass to the chat-completions request. |
| `SSH_HOST` | Hostname or IP address of the remote execution server. |
| `SSH_USERNAME` | SSH username for the remote execution server. |
| `SSH_PRIVATE_KEY_PATH` | Local filesystem path to the SSH private key used for the remote connection. |

Optional environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | Local NestJS server port. |
| `SSH_PORT` | `22` | SSH port on the remote execution server. |

## Running Locally

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production build
pnpm run build
pnpm run start:prod
```

## Usage

Generate and execute code on the remote server:

```bash
curl -X POST http://127.0.0.1:3000/llm \
  -H "Content-Type: application/json" \
  -d '{"message": "Write a code to traverse a binary tree."}'
```

Run a direct SSH command through the configured remote server:

```bash
curl -X POST http://127.0.0.1:3000/ssh \
  -H "Content-Type: application/json" \
  -d '{"command": "node --version"}'
```

## Security Notes

- Never commit `.env`, private keys, auth cookies, provider tokens, or generated cookie files.
- Keep `SSH_PRIVATE_KEY_PATH` pointed at a local private key file outside the repository.
- Restrict the private key file to the local user, for example with `chmod 600`.
- Treat the remote server as an execution sandbox. Generated code is executed there, so it should not have access to sensitive production data or privileged infrastructure.
- Prefer a dedicated remote user with limited permissions for this project.
- Rotate any token, cookie, or key that was accidentally committed or shared.

## Tests

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```
