import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTsController } from './transaction.ts.controller';

describe('TransactionTsController', () => {
  let controller: TransactionTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionTsController],
    }).compile();

    controller = module.get<TransactionTsController>(TransactionTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
