import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bullmq';
import { CodeGenService } from './code-gen.service';

describe('CodeGenService', () => {
  let service: CodeGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeGenService,
        {
          provide: getQueueToken('code-execution'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CodeGenService>(CodeGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
