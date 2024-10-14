import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const operationTypes = await prisma.operationsType.createMany({
      data: [
        { Description: "Normal Purchase" },
        { Description: "Purchase with installments" },
        { Description: "Withdrawal" },
        { Description: "Credit Voucher" },
      ],
    });

    console.log("Operation types created successfully: ", operationTypes);
  } catch (e) {
    console.log("Error running seed script: ", e);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
