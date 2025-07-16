-- CreateTable
CREATE TABLE "IndicadorAvaliativo" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "periodo" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "IndicadorAvaliativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaAvaliativa" (
    "id" SERIAL NOT NULL,
    "letra" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NotaAvaliativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliacaoIndicadorAluno" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "indicadorId" INTEGER NOT NULL,
    "notaId" INTEGER NOT NULL,
    "observacaoExtra" TEXT,

    CONSTRAINT "AvaliacaoIndicadorAluno_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IndicadorAvaliativo" ADD CONSTRAINT "IndicadorAvaliativo_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicadorAvaliativo" ADD CONSTRAINT "IndicadorAvaliativo_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaAvaliativa" ADD CONSTRAINT "NotaAvaliativa_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoIndicadorAluno" ADD CONSTRAINT "AvaliacaoIndicadorAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoIndicadorAluno" ADD CONSTRAINT "AvaliacaoIndicadorAluno_indicadorId_fkey" FOREIGN KEY ("indicadorId") REFERENCES "IndicadorAvaliativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoIndicadorAluno" ADD CONSTRAINT "AvaliacaoIndicadorAluno_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "NotaAvaliativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
