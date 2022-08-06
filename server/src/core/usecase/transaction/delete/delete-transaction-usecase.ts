import { NotFoundError } from '../../../errors/not-found-error';
import { ITransactionRepository } from '../../../repository/transaction-repository';

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    this.transactionRepository.delete(id);
  }
}

type Input = {
  id: string;
};
type Output = void;
