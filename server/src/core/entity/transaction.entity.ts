import { InvalidAmountError } from '../errors/invalid-amount.error';

export type TransactionEntityProps = {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  id: string;
  createdAt: Date;
};

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class TransactionEntity {
  constructor({
    id,
    createdAt,
    amount,
    type,
    description,
    category,
  }: TransactionEntityProps) {
    if (amount <= 0) {
      throw new InvalidAmountError('Amount must be greater than 0');
    }

    this.id = id;
    this.createdAt = createdAt;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.category = category;
  }

  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  category: string;
  createdAt: Date;
}
