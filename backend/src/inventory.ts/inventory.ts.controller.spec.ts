import { Test, TestingModule } from '@nestjs/testing';
import { InventoryTsController } from './inventory.ts.controller';

describe('InventoryTsController', () => {
  let controller: InventoryTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryTsController],
    }).compile();

    controller = module.get<InventoryTsController>(InventoryTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
