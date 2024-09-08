/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "document" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_document_key" ON "tbl_user"("document");
