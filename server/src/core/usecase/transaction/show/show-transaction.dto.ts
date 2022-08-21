import { TransactionEntity } from '../../../entity/transaction.entity';

export type ShowTransactionInputDto = {
  id: string;
};
export type ShowTransactionOutputDto = TransactionEntity;
