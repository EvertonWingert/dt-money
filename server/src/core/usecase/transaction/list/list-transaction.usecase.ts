import { TransactionEntity } from '../../../entity/transaction.entity';
import { ITransactionRepository } from '../../../repository/transaction.repository';
import {
  ListTransactionInputDto,
  ListTransactionOutputDto,
} from './list-transaction.dto';

export class ListTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    input: ListTransactionInputDto,
  ): Promise<ListTransactionOutputDto> {
    return this.transactionRepository.findAll();
  }
}
