import { AppError } from './base.error';

export class InvalidAmountError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
