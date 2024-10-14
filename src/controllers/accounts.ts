import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkHealth = async (req: Request, res: Response) => {
  res.send("Account controller unning");
};

const getAllAccounts = async (req: Request, res: Response) => {
  console.log("all");
  try {
    const allAccounts = await prisma.accounts.findMany();
    res.status(200).json(allAccounts);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAccount = async (req: Request, res: Response) => {
  console.log("req params: ", req.params);
  try {
    // console.log("req params: ", req.params);
    const { id: document_id } = req.params;
    console.log("account id: " + document_id);

    const account = await prisma.accounts.findUnique({
      where: {
        Document_Number: document_id,
      },
    });

    if (account !== null) {
      console.log("Account found: ", account);
    } else {
      console.log("Account not found");
      res.status(404).json({ message: "Account not found" });
      return;
    }

    res.status(200).json(account);
  } catch (e) {
    console.log("Error when searching account: ", e);
    res.status(500).json(e);
  }
};

const createAccount = async (req: Request, res: Response) => {
  try {
    const document_number = req.body.document_number;

    const newAccount = await prisma.accounts.create({
      data: {
        Document_Number: document_number,
      },
    });

    if (newAccount) {
      console.log("Account created successfully: ", newAccount);
    }
    res.status(200).json(newAccount);
  } catch (e) {
    console.log("Error when creating account: ", e);
    res.status(500).json(e);
  }
};

export { checkHealth, getAllAccounts, getAccount, createAccount };
