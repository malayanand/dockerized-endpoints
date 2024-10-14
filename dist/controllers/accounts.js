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
exports.createAccount = exports.getAccount = exports.getAllAccounts = exports.checkHealth = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkHealth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Account controller unning");
});
exports.checkHealth = checkHealth;
const getAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("all");
    try {
        const allAccounts = yield prisma.accounts.findMany();
        res.status(200).json(allAccounts);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.getAllAccounts = getAllAccounts;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req params: ", req.params);
    try {
        // console.log("req params: ", req.params);
        const { id: document_id } = req.params;
        console.log("account id: " + document_id);
        const account = yield prisma.accounts.findUnique({
            where: {
                Document_Number: document_id,
            },
        });
        if (account !== null) {
            console.log("Account found: ", account);
        }
        else {
            console.log("Account not found");
            res.status(404).json({ message: "Account not found" });
            return;
        }
        res.status(200).json(account);
    }
    catch (e) {
        console.log("Error when searching account: ", e);
        res.status(500).json(e);
    }
});
exports.getAccount = getAccount;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document_number = req.body.document_number;
        const newAccount = yield prisma.accounts.create({
            data: {
                Document_Number: document_number,
            },
        });
        if (newAccount) {
            console.log("Account created successfully: ", newAccount);
        }
        res.status(200).json(newAccount);
    }
    catch (e) {
        console.log("Error when creating account: ", e);
        res.status(500).json(e);
    }
});
exports.createAccount = createAccount;
