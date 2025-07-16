-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataContratacao" TIMESTAMP(3) NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "experienciaPontos" INTEGER NOT NULL,
    "formacaoPontos" INTEGER NOT NULL,
    "inglesPontos" INTEGER NOT NULL,
    "classificacao" TEXT NOT NULL,
    "pontosTotais" INTEGER NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FolhaPagamento" (
    "id" SERIAL NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "salarioBruto" DOUBLE PRECISION NOT NULL,
    "descontos" DOUBLE PRECISION NOT NULL,
    "salarioLiquido" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FolhaPagamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolhaPagamento" ADD CONSTRAINT "FolhaPagamento_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
