"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../controllers/accounts");
const transactions_1 = require("../controllers/transactions");
const router = (0, express_1.Router)();
router.route("/health").get(accounts_1.checkHealth);
router.route("/accounts/all").get(accounts_1.getAllAccounts);
router.route("/accounts/:id").get(accounts_1.getAccount);
router.route("/accounts").post(accounts_1.createAccount);
// create transaction
router.route("/transactions").post(transactions_1.createTransactions);
// get all
router.route("/transactions/all").get(transactions_1.getAllTransactions);
exports.default = router;
