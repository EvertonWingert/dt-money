import { NotFoundError } from '../../../errors/not-found.error';
import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  ShowTransactionInputDto,
  ShowTransactionOutputDto,
} from './show-transaction.dto';

export class FindTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({
    id,
  }: ShowTransactionInputDto): Promise<ShowTransactionOutputDto> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }
}
