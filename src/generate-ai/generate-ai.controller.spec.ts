import { Test, TestingModule } from '@nestjs/testing';
import { GenerateAiController } from './generate-ai.controller';
import { GenerateAiService } from './generate-ai.service';

describe('GenerateAiController', () => {
  let controller: GenerateAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateAiController],
      providers: [GenerateAiService],
    }).compile();

    controller = module.get<GenerateAiController>(GenerateAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
