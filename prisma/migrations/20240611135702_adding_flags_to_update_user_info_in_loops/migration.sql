-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailAdded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paidUser" BOOLEAN NOT NULL DEFAULT false;
