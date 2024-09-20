/*
  Warnings:

  - You are about to drop the column `arrived` on the `tbl_bus_driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_bus_driver" DROP COLUMN "arrived",
ADD COLUMN     "status_route" TEXT NOT NULL DEFAULT 'stop';
