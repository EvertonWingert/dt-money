import { TransactionEntity } from '../../../entity/transaction-entity';
import { ITransactionRepository } from '../../../repository/transaction-repository';

export class ListTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.transactionRepository.findAll();
  }
}

type Input = {};
type Output = TransactionEntity[];
