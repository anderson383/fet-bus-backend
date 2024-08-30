-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_program_academic_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_rh_id_fkey";

-- AlterTable
ALTER TABLE "tbl_user" ALTER COLUMN "rh_id" DROP NOT NULL,
ALTER COLUMN "program_academic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_rh_id_fkey" FOREIGN KEY ("rh_id") REFERENCES "tbl_list_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_program_academic_id_fkey" FOREIGN KEY ("program_academic_id") REFERENCES "tbl_academic_program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
