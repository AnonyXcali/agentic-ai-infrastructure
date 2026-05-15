import { Test, TestingModule } from '@nestjs/testing';
import { CodeGenController } from './code-gen.controller';

describe('CodeGenController', () => {
  let controller: CodeGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeGenController],
    }).compile();

    controller = module.get<CodeGenController>(CodeGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
