import supertest from "supertest";
import app, { TransactionEntity } from "../src/index";

describe("Transaction Routes", () => {
	const request = supertest(app);

	let transactions: TransactionEntity[] = [];

	beforeAll(async () => {
		const { body } = await request.post("/v1/api/transactions").send({
			amount: 100,
			type: "income",
			description: "Salary",
			category: "Salary",
		});

		transactions.push(body.data);
	});

	describe("GET /v1/api/transactions", () => {
		test("should return all transactions", async () => {
			const response = await request.get("/v1/api/transactions");

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("transactions");
		});
	});

	describe("GET /v1/api/transactions/:id", () => {
		test("should return a specific transaction", async () => {
			const response = await request.get(`/v1/api/transactions/${transactions[0].id}`);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("transaction");
		});
		test("should return 404 if transaction does not exist", async () => {
			const response = await request.get("/v1/api/transactions/101");

			expect(response.status).toBe(404);
		});
	});

	describe("POST /v1/api/transactions", () => {
		test("should create a transaction", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: 100,
				type: "income",
				description: "Salary",
				category: "Salary",
			});

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Transaction created successfully");
			expect(response.body.data.amount).toBe(100);
			expect(response.body.data.type).toBe("income");
			expect(response.body.data.description).toBe("Salary");
			expect(response.body.data.category).toBe("Salary");
		});
		test("should return 422 if amount is not an integer", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: "100",
				type: "income",
				description: "Salary",
				category: "Salary",
			});
		});
		test("should return 422 if type is not income or expense", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: 100,
				type: "outcome",
				description: "Salary",
				category: "Salary",
			});

			expect(response.status).toBe(422);
		});

		test("should return 422 if description is not a string", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: 100,
				type: "income",
				description: 100,
				category: "Salary",
			});

			expect(response.status).toBe(422);
		});

		test("should return 422 if category is not a string", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: 100,
				type: "income",
				description: "Salary",
				category: 100,
			});

			expect(response.status).toBe(422);
		});

		test("should return 422 if any field is missing", async () => {
			const response = await request.post("/v1/api/transactions").send({
				amount: 100,
				type: "income",
				description: "Salary",
			});

			expect(response.status).toBe(422);
		});
	});

	describe("PUT /v1/api/transactions/:id", () => {
		test("should return 404 if transaction does not exist", async () => {
			const response = await request.put("/v1/api/transactions/101").send({
				amount: 200,
				type: "income",
				description: "Salary",
				category: "Salary",
			});
			expect(response.status).toBe(404);
		});

		test("should update a specific transaction", async () => {
			const response = await request.put(`/v1/api/transactions/${transactions[0].id}`).send({
				amount: 200,
				type: "income",
				description: "Salary",
				category: "Salary",
			});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("transaction");
			expect(response.body.transaction.amount).toBe(200);
		});
	});

	describe("DELETE /v1/api/transactions/:id", () => {
		test("should return 404 if transaction does not exist", async () => {
			const response = await request.delete("/v1/api/transactions/");
			expect(response.status).toBe(404);
		});

		test("should delete a specific transaction", async () => {
			const response = await request.delete(`/v1/api/transactions/${transactions[0].id}`);
			expect(response.status).toBe(204);
		});
	});
});
