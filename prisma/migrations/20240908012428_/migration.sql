/*
  Warnings:

  - A unique constraint covering the columns `[placa]` on the table `tbl_car` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbl_car" ADD COLUMN     "color" TEXT,
ADD COLUMN     "company_id" UUID,
ADD COLUMN     "placa" TEXT,
ADD COLUMN     "size" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_car_placa_key" ON "tbl_car"("placa");

-- AddForeignKey
ALTER TABLE "tbl_car" ADD CONSTRAINT "tbl_car_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tbl_list_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
