/*
  Warnings:

  - Added the required column `user_id` to the `tbl_user_plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_user_plan" ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_user_plan" ADD CONSTRAINT "tbl_user_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
