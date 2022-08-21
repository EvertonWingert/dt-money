import { NotFoundError } from '../../../errors/not-found.error';
import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  DeleteTransactionInputDto,
  DeleteTransactionOutputDto,
} from './delete-transaction.dto';

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({
    id,
  }: DeleteTransactionInputDto): Promise<DeleteTransactionOutputDto> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    this.transactionRepository.delete(id);
  }
}
