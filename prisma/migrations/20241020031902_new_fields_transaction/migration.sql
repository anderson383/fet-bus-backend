/*
  Warnings:

  - You are about to drop the column `amount` on the `tbl_transacions` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `tbl_transacions` table. All the data in the column will be lost.
  - You are about to drop the column `date_payment` on the `tbl_transacions` table. All the data in the column will be lost.
  - You are about to drop the column `status_transaction` on the `tbl_transacions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `tbl_transacions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referenceProvider]` on the table `tbl_transacions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mount` to the `tbl_transacions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `tbl_transacions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `tbl_transacions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusTransaction` to the `tbl_transacions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_transacions" DROP COLUMN "amount",
DROP COLUMN "code",
DROP COLUMN "date_payment",
DROP COLUMN "status_transaction",
ADD COLUMN     "mount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "referenceProvider" TEXT,
ADD COLUMN     "statusTransaction" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_transacions_reference_key" ON "tbl_transacions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_transacions_referenceProvider_key" ON "tbl_transacions"("referenceProvider");
