/*
  Warnings:

  - You are about to drop the column `driver_id` on the `tbl_car` table. All the data in the column will be lost.
  - The `status` column on the `tbl_transacions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tbl_user_plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `status_transaction` to the `tbl_transacions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_plan` to the `tbl_user_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_qr` to the `tbl_user_qr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "list_type" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_academic_program" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_bus_driver" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_car" DROP COLUMN "driver_id",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_car_route" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_list_item" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_plans" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_rol" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_transacions" ADD COLUMN     "status_transaction" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_user_plan" ADD COLUMN     "status_plan" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "tbl_user_qr" ADD COLUMN     "status_qr" BOOLEAN NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
