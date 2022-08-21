import { TransactionEntity } from '../../../entity/transaction.entity';
import { CreateTransactionOutputDto } from './create-transaction.dto';

export class CreateTransactionMapper {
  static toMap(input: TransactionEntity): CreateTransactionOutputDto {
    return {
      amount: input.amount,
      type: input.type,
      description: input.description,
      category: input.category,
      id: input.id,
      created_at: input.createdAt,
    };
  }
}
