-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emailMae" TEXT,
    "emailPai" TEXT,
    "telefoneMae" TEXT,
    "telefonePai" TEXT,
    "endereco" TEXT,
    "observacoes" TEXT,
    "docRg" TEXT,
    "docCertidao" TEXT,
    "docContrato" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);
