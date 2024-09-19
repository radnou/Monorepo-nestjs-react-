import { Test, TestingModule } from '@nestjs/testing';
import { ArtefactsController } from './artefacts.controller';
import { ArtefactsService } from './artefacts.service';

describe('ArtefactsController', () => {
  let controller: ArtefactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtefactsController],
      providers: [ArtefactsService],
    }).compile();

    controller = module.get<ArtefactsController>(ArtefactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
