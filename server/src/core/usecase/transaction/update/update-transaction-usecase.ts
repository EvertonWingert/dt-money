import {
  TransactionEntity,
  TransactionType,
} from '../../../entity/transaction-entity';
import { NotFoundError } from '../../../errors/not-found-error';
import { ITransactionRepository } from '../../../repository/transaction-repository';

export class UpdateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(input: Input): Promise<Output> {
    const transaction = await this.transactionRepository.findById(input.id);
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    transaction.amount = input.amount;
    transaction.type = input.type as TransactionType;
    transaction.description = input.description;
    transaction.category = input.category;

    return this.transactionRepository.update(input.id, transaction);
  }
}

type Input = {
  id: string;
  amount: number;
  type: string;
  description: string;
  category: string;
};
type Output = TransactionEntity;
