/*
  Warnings:

  - You are about to drop the column `dataPagamento` on the `FolhaPagamento` table. All the data in the column will be lost.
  - Added the required column `anoReferencia` to the `FolhaPagamento` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mesReferencia` on the `FolhaPagamento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FolhaPagamento" DROP COLUMN "dataPagamento",
ADD COLUMN     "anoReferencia" INTEGER NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "mesReferencia",
ADD COLUMN     "mesReferencia" INTEGER NOT NULL;
