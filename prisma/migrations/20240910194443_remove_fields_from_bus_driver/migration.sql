/*
  Warnings:

  - You are about to drop the column `color` on the `tbl_bus_driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tbl_bus_driver` table. All the data in the column will be lost.
  - You are about to drop the column `placa` on the `tbl_bus_driver` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `tbl_bus_driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_bus_driver" DROP COLUMN "color",
DROP COLUMN "name",
DROP COLUMN "placa",
DROP COLUMN "size";
