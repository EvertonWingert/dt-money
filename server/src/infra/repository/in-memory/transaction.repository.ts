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
        id: '1',
        createdAt: new Date(),
      }),
    ];
  }

  async create(
    amount: number,
    type: string,
    description: string,
    category: string,
  ): Promise<TransactionEntity> {
    const newTransaction = new TransactionEntity({
      amount,
      type: type as TransactionType,
      description,
      category,
      id: String(this.transactions.length + 1),
      createdAt: new Date(),
    });

    this.transactions.push(newTransaction);

    return Promise.resolve(newTransaction);
  }
  async update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    const index = this.transactions.findIndex(
      transaction => transaction.id === id,
    );

    this.transactions[index] = transaction;

    return Promise.resolve(transaction);
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
