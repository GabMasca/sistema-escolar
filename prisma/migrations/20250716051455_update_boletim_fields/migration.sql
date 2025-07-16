/*
  Warnings:

  - You are about to drop the column `avaliacao1` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `avaliacao2` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `avaliacao3` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `recuperacao` on the `Boletim` table. All the data in the column will be lost.
  - You are about to drop the column `trabalhos` on the `Boletim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Boletim" DROP COLUMN "avaliacao1",
DROP COLUMN "avaliacao2",
DROP COLUMN "avaliacao3",
DROP COLUMN "recuperacao",
DROP COLUMN "trabalhos",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notaAvaliacao1" DOUBLE PRECISION,
ADD COLUMN     "notaAvaliacao2" DOUBLE PRECISION,
ADD COLUMN     "notaAvaliacao3" DOUBLE PRECISION,
ADD COLUMN     "notaRecuperacao" DOUBLE PRECISION,
ADD COLUMN     "notaTrabalho" DOUBLE PRECISION,
ADD COLUMN     "observacoes" TEXT;
