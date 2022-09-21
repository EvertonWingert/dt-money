import { TransactionEntity, TransactionType } from '../../../entity/transaction.entity';
import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './create-transaction.dto';
import { CreateTransactionMapper } from './create-transaction.mapper';

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) { }

  async execute(
    input: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {

    const transaction = new TransactionEntity({
      amount: input.amount,
      type: input.type as TransactionType,
      description: input.description,
      category: input.category,
    })

    await this.transactionRepository.create(transaction)
    return CreateTransactionMapper.toMap(transaction);
  }
}
