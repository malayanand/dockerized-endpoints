import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const account_id = req.body.account_id;
  const operation_type_id = req.body.operation_type_id;
  let amount = req.body.amount;

  try {
    const accountExists = await prisma.accounts.findUnique({
      where: {
        Account_ID: account_id,
      },
    });

    if (accountExists === null) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    const operationTypeExists = await prisma.operationsType.findUnique({
      where: {
        OperationType_ID: operation_type_id,
      },
    });

    if (!operationTypeExists) {
      res.status(404).json({ message: "Operation type not found" });
      return;
    }

    const operationName = operationTypeExists.Description;
    switch (operationName) {
      case "Normal Purchase":
      case "Purchase with installments":
      case "Withdrawal":
        amount *= -1;
        break;
    }
    console.log("Opearation type: ", operation_type_id, " amt: ", amount);

    const newTransaction = await prisma.transactions.create({
      data: {
        Account_ID: account_id,
        OperationType_ID: operation_type_id,
        Amount: amount,
        EventDate: new Date(),
      },
    });

    console.log("Transaction created: ", newTransaction);
    res.status(201).json(newTransaction);
  } catch (e) {
    console.log("Error searching for account", e);
    res.status(500).json(e);
  }
};

const getAllTransactions = async (req: Request, res: Response) => {
  console.log("all");
  try {
    const allTransactions = await prisma.transactions.findMany();
    res.status(200).json(allTransactions);
  } catch (e) {
    res.status(500).json(e);
  }
};

export { createTransactions, getAllTransactions };
