-- CreateTable
CREATE TABLE "Accounts" (
    "Account_ID" SERIAL NOT NULL,
    "Document_Number" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("Account_ID")
);

-- CreateTable
CREATE TABLE "OperationsType" (
    "OperationType_ID" SERIAL NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "OperationsType_pkey" PRIMARY KEY ("OperationType_ID")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "Transaction_ID" SERIAL NOT NULL,
    "Account_ID" INTEGER NOT NULL,
    "OperationType_ID" INTEGER NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "EventDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("Transaction_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_Document_Number_key" ON "Accounts"("Document_Number");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_Account_ID_fkey" FOREIGN KEY ("Account_ID") REFERENCES "Accounts"("Account_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_OperationType_ID_fkey" FOREIGN KEY ("OperationType_ID") REFERENCES "OperationsType"("OperationType_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
