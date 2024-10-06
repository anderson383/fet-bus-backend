-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "eps_id" UUID;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_eps_id_fkey" FOREIGN KEY ("eps_id") REFERENCES "tbl_list_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
