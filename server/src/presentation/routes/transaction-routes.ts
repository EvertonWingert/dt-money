import { Router } from 'express';
import { TransactionController } from '../controller/transaction-controller';

const route = Router();

//List all transactions
route.get('/v1/api/transactions', new TransactionController().index);

//Show a specific transaction
route.get('/v1/api/transactions/:id', new TransactionController().show);

//Create a new transaction
route.post('/v1/api/transactions', new TransactionController().create);

//Update a transaction
route.put('/v1/api/transactions/:id', new TransactionController().update);

//Delete a transaction
route.delete('/v1/api/transactions/:id', new TransactionController().delete);

export default route;
