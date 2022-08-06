import { TransactionEntity } from '../../../entity/transaction-entity';
import { NotFoundError } from '../../../errors/not-found-error';
import { ITransactionRepository } from '../../../repository/transaction-repository';

export class FindTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }
}

type Input = {
  id: string;
};
type Output = TransactionEntity;
