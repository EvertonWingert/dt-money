import { NextFunction, Request, Response } from 'express';
import { TransactionRepositoryInMemory } from '../../infra/repository/in-memory/transaction.repository';
import { ListTransactionUseCase } from '../../core/usecase/transaction/list/list-transaction.usecase';
import { FindTransactionUseCase } from '../../core/usecase/transaction/show/show-transaction.usecase';
import { CreateTransactionUseCase } from '../../core/usecase/transaction/create/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../core/usecase/transaction/delete/delete-transaction.usecase';
import { UpdateTransactionUseCase } from '../../core/usecase/transaction/update/update-transaction.usecase';

export class TransactionController {
  async index(req: Request, res: Response, next: NextFunction) {
    const transactionRepository = new TransactionRepositoryInMemory();
    const listTransactionsUseCase = new ListTransactionUseCase(
      transactionRepository,
    );

    try {
      const transactions = await listTransactionsUseCase.execute({});
      return res.status(200).json({
        transactions,
      });
    } catch (error) {
      return next(error);
    }
  }
  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const transactionRepository = new TransactionRepositoryInMemory();
    const findTransactionUseCase = new FindTransactionUseCase(
      transactionRepository,
    );

    try {
      const transaction = await findTransactionUseCase.execute({ id });
      return res.status(200).json({
        transaction,
      });
    } catch (error) {
      return next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const { amount, type, description, category } = req.body;

    if (!amount || !type || !description || !category) {
      return res.status(422).json({
        message:
          'Missing required fields (amount, type, description, category)',
      });
    }

    if (!Number.isInteger(amount)) {
      return res.status(422).json({
        message: 'Amount must be an integer',
      });
    }

    if (typeof type !== 'string') {
      return res.status(422).json({
        message: 'Type must be a string',
      });
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(422).json({
        message: 'Type must be income or expense',
      });
    }

    if (typeof description !== 'string') {
      return res.status(422).json({
        message: 'Description must be a string',
      });
    }

    if (typeof category !== 'string') {
      return res.status(422).json({
        message: 'Category must be a string',
      });
    }

    const transactionRepository = new TransactionRepositoryInMemory();
    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );

    try {
      const transaction = await createTransactionUseCase.execute({
        amount,
        type,
        description,
        category,
      });
      return res.status(201).json({
        message: 'Transaction created successfully',
        data: transaction,
      });
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { amount, type, description, category } = req.body;

    if (!amount || !type || !description || !category) {
      return res.status(422).json({
        message:
          'Missing required fields (amount, type, description, category)',
      });
    }

    if (!Number.isInteger(amount)) {
      return res.status(422).json({
        message: 'Amount must be an integer',
      });
    }

    if (typeof type !== 'string') {
      return res.status(422).json({
        message: 'Type must be a string',
      });
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(422).json({
        message: 'Type must be income or expense',
      });
    }

    if (typeof description !== 'string') {
      return res.status(422).json({
        message: 'Description must be a string',
      });
    }

    if (typeof category !== 'string') {
      return res.status(422).json({
        message: 'Category must be a string',
      });
    }

    const transactionRepository = new TransactionRepositoryInMemory();
    const updateTransactionUseCase = new UpdateTransactionUseCase(
      transactionRepository,
    );

    try {
      const transaction = await updateTransactionUseCase.execute({
        id,
        amount,
        type,
        description,
        category,
      });
      return res.status(200).json({
        data: transaction,
      });
    } catch (error) {
      return next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const transactionRepository = new TransactionRepositoryInMemory();
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
      transactionRepository,
    );

    try {
      await deleteTransactionUseCase.execute({ id });
      return res.status(204).json({
        message: 'Transaction deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  }
}
