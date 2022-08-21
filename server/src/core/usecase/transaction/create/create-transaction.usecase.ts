import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './create-transaction.dto';

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    input: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    return this.transactionRepository.create(
      input.amount,
      input.type,
      input.description,
      input.category,
    );
  }
}
