import express from "express";
import { Request, Response } from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export type TransactionEntity = {
	id: string;
	amount: number;
	type: string;
	description: string;
	category: string;
	createdAt: Date;
};
const transactions = <TransactionEntity[]>[];

//List all transactions
app.get("/v1/api/transactions", (req: Request, res: Response) => {
	return res.status(200).json({
		transactions,
	});
});

//Show a specific transaction
app.get("/v1/api/transactions/:id", (req: Request, res: Response) => {
	const transaction = transactions.find((transaction) => transaction.id === req.params.id);
	if (!transaction) {
		return res.status(404).json({
			message: "Transaction not found",
		});
	}

	return res.status(200).json({
		transaction,
	});
});

//Create a new transaction
app.post("/v1/api/transactions", (req: Request, res: Response) => {
	const { amount, type, description, category } = req.body;

	if (!amount || !type || !description || !category) {
		return res.status(422).json({
			message: "Missing required fields (amount, type, description, category)",
		});
	}

	if (!Number.isInteger(amount)) {
		return res.status(422).json({
			message: "Amount must be an integer",
		});
	}

	if (typeof type !== "string") {
		return res.status(422).json({
			message: "Type must be a string",
		});
	}

	if (type !== "income" && type !== "expense") {
		return res.status(422).json({
			message: "Type must be income or expense",
		});
	}

	if (typeof description !== "string") {
		return res.status(422).json({
			message: "Description must be a string",
		});
	}

	if (typeof category !== "string") {
		return res.status(422).json({
			message: "Category must be a string",
		});
	}

	const id = crypto.randomBytes(16).toString("hex");

	const transaction = {
		id,
		amount,
		type,
		description,
		category,
		createdAt: new Date(),
	};

	transactions.push(transaction);

	return res.status(201).json({
		message: "Transaction created successfully",
		data: transaction,
	});
});

//Update a transaction
app.put("/v1/api/transactions/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const { amount, type, description, category } = req.body;

	if (!amount || !type || !description || !category) {
		return res.status(422).json({
			message: "Missing required fields (amount, type, description, category)",
		});
	}

	if (!Number.isInteger(amount)) {
		return res.status(422).json({
			message: "Amount must be an integer",
		});
	}

	if (typeof type !== "string") {
		return res.status(422).json({
			message: "Type must be a string",
		});
	}

	if (type !== "income" && type !== "expense") {
		return res.status(422).json({
			message: "Type must be income or expense",
		});
	}

	if (typeof description !== "string") {
		return res.status(422).json({
			message: "Description must be a string",
		});
	}

	if (typeof category !== "string") {
		return res.status(422).json({
			message: "Category must be a string",
		});
	}

	//update
	const transaction = transactions.find((t) => t.id === id);
	if (!transaction) {
		return res.status(404).json({
			message: "Transaction not found",
		});
	}

	transaction.amount = amount;
	transaction.type = type;
	transaction.description = description;
	transaction.category = category;

	return res.status(200).json({
		transaction,
	});
});

//Delete a transaction
app.delete("/v1/api/transactions/:id", (req: Request, res: Response) => {
	const transaction = transactions.find((transaction) => transaction.id === req.params.id);
	if (!transaction) {
		return res.status(404).json({
			message: "Transaction not found",
		});
	}

	transactions.slice(transactions.indexOf(transaction), 1);

	return res.status(204).json({
		message: "Transaction deleted successfully",
	});
});

export default app;
