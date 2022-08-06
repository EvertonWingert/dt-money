import { TransactionEntity } from '../entity/transaction-entity';

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
  delete(id: string): Promise<void>;
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | undefined>;
}
