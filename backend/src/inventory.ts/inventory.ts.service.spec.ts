import { Test, TestingModule } from '@nestjs/testing';
import { InventoryTsService } from './inventory.ts.service';

describe('InventoryTsService', () => {
  let service: InventoryTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryTsService],
    }).compile();

    service = module.get<InventoryTsService>(InventoryTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
