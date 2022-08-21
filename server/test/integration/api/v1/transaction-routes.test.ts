import supertest from 'supertest';
import app from '../../../../src/index';

describe('Transaction Routes', () => {
  const request = supertest(app);

  describe('GET /api/v1/transactions', () => {
    test('should return all transactions', async () => {
      const response = await request.get('/api/v1/transactions');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('transactions');
    });
  });

  describe('GET /api/v1/transactions/:id', () => {
    test('should return a specific transaction', async () => {
      const response = await request.get(`/api/v1/transactions/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('transaction');
    });
    test('should return 404 if transaction does not exist', async () => {
      const response = await request.get('/api/v1/transactions/101');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/v1/transactions', () => {
    test('should create a transaction', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: 100,
        type: 'income',
        description: 'Salary',
        category: 'Salary',
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Transaction created successfully');
      expect(response.body.data.amount).toBe(100);
      expect(response.body.data.type).toBe('income');
      expect(response.body.data.description).toBe('Salary');
      expect(response.body.data.category).toBe('Salary');
    });

    test('should return 422 if amount is not an integer', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: '100',
        type: 'income',
        description: 'Salary',
        category: 'Salary',
      });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe('Amount must be an integer');
    });

    test('should return 422 if type is not income or expense', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: 100,
        type: 'outcome',
        description: 'Salary',
        category: 'Salary',
      });

      expect(response.status).toBe(422);
    });

    test('should return 422 if description is not a string', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: 100,
        type: 'income',
        description: 100,
        category: 'Salary',
      });

      expect(response.status).toBe(422);
    });

    test('should return 422 if category is not a string', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: 100,
        type: 'income',
        description: 'Salary',
        category: 100,
      });

      expect(response.status).toBe(422);
    });

    test('should return 422 if any field is missing', async () => {
      const response = await request.post('/api/v1/transactions').send({
        amount: 100,
        type: 'income',
        description: 'Salary',
      });

      expect(response.status).toBe(422);
    });
  });

  describe('PUT /api/v1/transactions/:id', () => {
    test('should return 404 if transaction does not exist', async () => {
      const response = await request.put('/api/v1/transactions/2').send({
        amount: 200,
        type: 'income',
        description: 'Salary',
        category: 'Salary',
      });
      expect(response.status).toBe(404);
    });

    test('should update a specific transaction', async () => {
      const response = await request.put('/api/v1/transactions/1').send({
        amount: 200,
        type: 'income',
        description: 'Salary',
        category: 'Salary',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.amount).toBe(200);
    });
  });

  describe('DELETE /api/v1/transactions/:id', () => {
    test('should return 404 if transaction does not exist', async () => {
      const response = await request.delete('/api/v1/transactions/2');
      expect(response.status).toBe(404);
    });

    test('should delete a specific transaction', async () => {
      const response = await request.delete('/api/v1/transactions/1');
      expect(response.status).toBe(204);
    });
  });
});
