import { InvalidAmountError } from '../errors/invalid-amount.error';
import { randomUUID } from 'crypto';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

type Props = {
  id?: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  createdAt?: Date;
};

export class TransactionEntity {

  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  category: string;
  createdAt: Date;

  constructor({
    id,
    createdAt,
    amount,
    type,
    description,
    category,
  }: Props) {
    if (amount <= 0) {
      throw new InvalidAmountError('Amount must be greater than 0');
    }

    this.id = id || randomUUID();
    this.createdAt = createdAt || new Date();
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.category = category;
  }
}


