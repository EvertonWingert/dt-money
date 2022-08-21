import { Router } from 'express';
import { TransactionController } from '../controller/transaction.controller';

const route = Router();

route.get('/api/v1/transactions', new TransactionController().index);
route.get('/api/v1/transactions/:id', new TransactionController().show);
route.post('/api/v1/transactions', new TransactionController().create);
route.put('/api/v1/transactions/:id', new TransactionController().update);
route.delete('/api/v1/transactions/:id', new TransactionController().delete);

export default route;
