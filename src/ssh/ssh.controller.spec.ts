import { Test, TestingModule } from '@nestjs/testing';
import { SshController } from './ssh.controller';
import { SshService } from './ssh.service';

describe('SshController', () => {
  let controller: SshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SshController],
      providers: [
        {
          provide: SshService,
          useValue: {
            runCommand: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SshController>(SshController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
