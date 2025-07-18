import { prisma } from '../../lib/prisma';



interface FolhaInput {
  funcionarioId: number;
  mesReferencia: number;
  anoReferencia: number;
  salarioBruto: number;
  descontos: number;
}

export async function criarFolhaPagamento(data: FolhaInput) {
  if (
    typeof data.funcionarioId !== "number" ||
    typeof data.mesReferencia !== "number" ||
    typeof data.anoReferencia !== "number" ||
    typeof data.salarioBruto !== "number" ||
    typeof data.descontos !== "number"
  ) {
    throw new Error("Dados inválidos para folha de pagamento.");
  }

  const salarioLiquido = data.salarioBruto - data.descontos;

  return await prisma.folhaPagamento.create({
    data: {
      funcionarioId: data.funcionarioId,
      mesReferencia: data.mesReferencia,
      anoReferencia: data.anoReferencia,
      salarioBruto: data.salarioBruto,
      descontos: data.descontos,
      salarioLiquido,
    },
  });
}

export async function listarFolhas() {
  return await prisma.folhaPagamento.findMany({
    include: {
      funcionario: true,
    },
  });
}

export async function atualizarFolha(id: number, data: Partial<FolhaInput>) {
  const folhaExistente = await prisma.folhaPagamento.findUnique({ where: { id } });
  if (!folhaExistente) throw new Error("Folha de pagamento não encontrada.");

  const salarioBruto = data.salarioBruto ?? folhaExistente.salarioBruto;
  const descontos = data.descontos ?? folhaExistente.descontos;
  const salarioLiquido = salarioBruto - descontos;

  return await prisma.folhaPagamento.update({
    where: { id },
    data: {
      ...data,
      salarioLiquido,
    },
  });
}

export async function deletarFolha(id: number) {
  return await prisma.folhaPagamento.delete({ where: { id } });
}
