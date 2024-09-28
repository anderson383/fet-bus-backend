/*
  Warnings:

  - You are about to drop the column `code_qr` on the `tbl_user_qr` table. All the data in the column will be lost.
  - You are about to drop the column `date_user` on the `tbl_user_qr` table. All the data in the column will be lost.
  - You are about to drop the column `status_qr` on the `tbl_user_qr` table. All the data in the column will be lost.
  - Added the required column `code_qr_id` to the `tbl_user_qr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_bus_driver" ALTER COLUMN "status_route" SET DEFAULT 'STOP';

-- AlterTable
ALTER TABLE "tbl_user_qr" DROP COLUMN "code_qr",
DROP COLUMN "date_user",
DROP COLUMN "status_qr",
ADD COLUMN     "code_qr_id" UUID NOT NULL,
ADD COLUMN     "date_use" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "tbl_code_qr" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "date_activate" TIMESTAMP(3),
    "date_deactivate" TIMESTAMP(3),
    "bus_driver_id" UUID NOT NULL,

    CONSTRAINT "tbl_code_qr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_user_qr" ADD CONSTRAINT "tbl_user_qr_code_qr_id_fkey" FOREIGN KEY ("code_qr_id") REFERENCES "tbl_code_qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_code_qr" ADD CONSTRAINT "tbl_code_qr_bus_driver_id_fkey" FOREIGN KEY ("bus_driver_id") REFERENCES "tbl_bus_driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
