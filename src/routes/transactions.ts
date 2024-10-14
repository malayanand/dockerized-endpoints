import { Router } from "express";
import {
  getAllAccounts,
  getAccount,
  createAccount,
  checkHealth,
} from "../controllers/accounts";
import {
  createTransactions,
  getAllTransactions,
} from "../controllers/transactions";

const router = Router();

router.route("/health").get(checkHealth);
router.route("/accounts/all").get(getAllAccounts);
router.route("/accounts/:id").get(getAccount);
router.route("/accounts").post(createAccount);
// create transaction
router.route("/transactions").post(createTransactions);
// get all
router.route("/transactions/all").get(getAllTransactions);

export default router;
