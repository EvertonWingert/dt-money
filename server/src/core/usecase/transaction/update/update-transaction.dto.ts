import { TransactionEntity } from '../../../entity/transaction.entity';

export type UpdateTransactionInputDto = {
  id: string;
  amount: number;
  type: string;
  description: string;
  category: string;
};
export type UpdateTransactionOutputDto = TransactionEntity;
