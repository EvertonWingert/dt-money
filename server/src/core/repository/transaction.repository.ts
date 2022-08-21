import { TransactionEntity } from '../entity/transaction.entity';

export interface ITransactionRepository {
  create(
    amount: number,
    type: string,
    description: string,
    category: string,
  ): Promise<TransactionEntity>;
  update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<TransactionEntity>;
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | undefined>;
  delete(id: string): Promise<void>;
}
