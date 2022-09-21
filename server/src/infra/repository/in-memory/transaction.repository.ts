import {
  TransactionEntity,
  TransactionType,
} from '../../../core/entity/transaction.entity';
import { ITransactionRepository } from '../../../core/repository/transaction.repository';

export class TransactionRepositoryInMemory implements ITransactionRepository {
  transactions = <TransactionEntity[]>[];

  constructor() {
    this.transactions = [
      new TransactionEntity({
        amount: 100,
        type: TransactionType.INCOME,
        description: 'Salary',
        category: 'Salary',
        createdAt: new Date(),
        id: '36b8f84d-df4e-4d49-b662-bcde71a8764f'
      }),
    ];
  }

  async create(
    transaction: TransactionEntity
  ): Promise<void> {
    this.transactions.push(transaction);
    return Promise.resolve();
  }
  async update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<void> {
    const index = this.transactions.findIndex(
      transaction => transaction.id === id,
    );

    this.transactions[index] = transaction;

    return Promise.resolve();
  }
  async delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter(
      transaction => transaction.id !== id,
    );
  }
  async findAll(): Promise<TransactionEntity[]> {
    return Promise.resolve(this.transactions);
  }
  async findById(id: string): Promise<TransactionEntity | undefined> {
    const transaction = this.transactions.find(
      transaction => transaction.id === id,
    );
    return Promise.resolve(transaction);
  }
}
