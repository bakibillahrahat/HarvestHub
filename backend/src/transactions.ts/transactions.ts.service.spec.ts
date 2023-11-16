import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsTsService } from './transactions.ts.service';

describe('TransactionsTsService', () => {
  let service: TransactionsTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsTsService],
    }).compile();

    service = module.get<TransactionsTsService>(TransactionsTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
