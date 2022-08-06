export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class TransactionEntity {
  constructor(
    public id: string,
    public amount: number,
    public type: TransactionType,
    public description: string,
    public category: string,
    public createdAt: Date,
  ) {}
}
