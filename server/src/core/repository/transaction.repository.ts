import { TransactionEntity } from '../entity/transaction.entity';

export interface ITransactionRepository {
  create(transaction: TransactionEntity): Promise<void>;
  update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<void>;
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | undefined>;
  delete(id: string): Promise<void>;
}
