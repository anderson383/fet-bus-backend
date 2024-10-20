/*
  Warnings:

  - You are about to drop the column `type_payment_id` on the `tbl_transacions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_transacions" DROP CONSTRAINT "tbl_transacions_type_payment_id_fkey";

-- AlterTable
ALTER TABLE "tbl_transacions" DROP COLUMN "type_payment_id";
