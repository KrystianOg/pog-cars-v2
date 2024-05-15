import { Test, TestingModule } from '@nestjs/testing';
import { AgenciesService } from './agencies.service';
import { DbModule } from '../db/db.module';

describe('AgenciesService', () => {
  let service: AgenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [AgenciesService],
    }).compile();

    service = module.get<AgenciesService>(AgenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
