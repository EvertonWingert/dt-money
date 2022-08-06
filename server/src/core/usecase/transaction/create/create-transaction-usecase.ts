import { TransactionEntity } from '../../../entity/transaction-entity';
import { ITransactionRepository } from '../../../repository/transaction-repository';

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.transactionRepository.create(
      input.amount,
      input.type,
      input.description,
      input.category,
    );
  }
}

type Input = {
  amount: number;
  type: string;
  description: string;
  category: string;
};
type Output = TransactionEntity;
