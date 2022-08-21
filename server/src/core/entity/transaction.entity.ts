import { InvalidAmountError } from '../errors/invalid-amount.error';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class TransactionEntity {
  constructor(
    private _id: string,
    private _amount: number,
    private _type: TransactionType,
    private _description: string,
    private _category: string,
    private _createdAt: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get amount(): number {
    return this._amount;
  }

  get type(): TransactionType {
    return this._type;
  }

  get description(): string {
    return this._description;
  }

  get category(): string {
    return this._category;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set id(id: string) {
    this._id = id;
  }

  set amount(amount: number) {
    if (amount < 0) {
      throw new InvalidAmountError('Amount cannot be negative');
    }

    this._amount = amount;
  }

  set type(type: TransactionType) {
    this._type = type;
  }

  set description(description: string) {
    this._description = description;
  }

  set category(category: string) {
    this._category = category;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }
}
