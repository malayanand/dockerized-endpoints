"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = exports.createTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account_id = req.body.account_id;
    const operation_type_id = req.body.operation_type_id;
    let amount = req.body.amount;
    try {
        const accountExists = yield prisma.accounts.findUnique({
            where: {
                Account_ID: account_id,
            },
        });
        if (accountExists === null) {
            res.status(404).json({ message: "Account not found" });
            return;
        }
        const operationTypeExists = yield prisma.operationsType.findUnique({
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
        const newTransaction = yield prisma.transactions.create({
            data: {
                Account_ID: account_id,
                OperationType_ID: operation_type_id,
                Amount: amount,
                EventDate: new Date(),
            },
        });
        console.log("Transaction created: ", newTransaction);
        res.status(201).json(newTransaction);
    }
    catch (e) {
        console.log("Error searching for account", e);
        res.status(500).json(e);
    }
});
exports.createTransactions = createTransactions;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("all");
    try {
        const allTransactions = yield prisma.transactions.findMany();
        res.status(200).json(allTransactions);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.getAllTransactions = getAllTransactions;
