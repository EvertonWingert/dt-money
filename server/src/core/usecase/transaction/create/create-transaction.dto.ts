import { TransactionEntity } from '../../../entity/transaction.entity';

export type CreateTransactionInputDto = {
  amount: number;
  type: string;
  description: string;
  category: string;
};
export type CreateTransactionOutputDto = TransactionEntity;
