import express from 'express';
import { errorMiddleware } from './presentation/middlewares/error.middleware';
import transactionRoutes from './presentation/routes/api/v1/transaction.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(transactionRoutes);
app.use(errorMiddleware);

export default app;
