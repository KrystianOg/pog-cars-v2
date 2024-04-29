import { Test, TestingModule } from '@nestjs/testing';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { agencies } from './agencies.mocks';

describe('AgenciesController', () => {
  let controller: AgenciesController;
  let service: AgenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciesController],
      providers: [AgenciesService],
    }).compile();

    service = module.get<AgenciesService>(AgenciesService);
    controller = module.get<AgenciesController>(AgenciesController);
  });

  describe('findAll', () => {
    it('should return as array of agencies', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          process.nextTick(() => resolve(agencies));
        });
      });
      const data = await controller.findAll();
      expect(data).toBe(agencies);
    });
  });

  /// findOne create, update softDelete hardDelete
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
