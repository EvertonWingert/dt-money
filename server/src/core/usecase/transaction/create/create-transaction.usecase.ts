import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './create-transaction.dto';
import { CreateTransactionMapper } from './create-transaction.mapper';

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    input: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    const transaction = await this.transactionRepository.create(
      input.amount,
      input.type,
      input.description,
      input.category,
    );

    return CreateTransactionMapper.toMap(transaction);
  }
}
