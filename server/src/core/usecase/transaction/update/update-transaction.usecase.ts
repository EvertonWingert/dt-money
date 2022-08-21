import { TransactionType } from '../../../entity/transaction.entity';
import { NotFoundError } from '../../../errors/not-found.error';
import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  UpdateTransactionInputDto,
  UpdateTransactionOutputDto,
} from './update-transaction.dto';

export class UpdateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    input: UpdateTransactionInputDto,
  ): Promise<UpdateTransactionOutputDto> {
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
