import { Router } from 'express';
import { TransactionController } from '../controller/transaction.controller';

const route = Router();

route.get('/v1/api/transactions', new TransactionController().index);
route.get('/v1/api/transactions/:id', new TransactionController().show);
route.post('/v1/api/transactions', new TransactionController().create);
route.put('/v1/api/transactions/:id', new TransactionController().update);
route.delete('/v1/api/transactions/:id', new TransactionController().delete);

export default route;
