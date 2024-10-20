/*
  Warnings:

  - Changed the type of `date_start` on the `tbl_user_plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date_end` on the `tbl_user_plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status_plan` on the `tbl_user_plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tbl_user_plan" DROP COLUMN "date_start",
ADD COLUMN     "date_start" TIMESTAMP(3) NOT NULL,
DROP COLUMN "date_end",
ADD COLUMN     "date_end" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status_plan",
ADD COLUMN     "status_plan" BOOLEAN NOT NULL;
