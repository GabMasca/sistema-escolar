const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /avaliacoes-indicadores
router.post('/', async (req, res) => {
  let { alunoId, indicadorId, notaId, observacaoExtra } = req.body;

  if (!alunoId || !indicadorId || !notaId) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  alunoId = Number(alunoId);
  indicadorId = Number(indicadorId);
  notaId = Number(notaId);

  try {
    const avaliacao = await prisma.avaliacaoIndicadorAluno.create({
      data: {
        alunoId,
        indicadorId,
        notaId,
        observacaoExtra: observacaoExtra || null
      }
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    console.error('Erro ao atribuir avaliação:', error);
    res.status(500).json({ error: 'Erro ao atribuir avaliação.' });
  }
});

// GET /avaliacoes-indicadores?alunoId=1
router.get('/', async (req, res) => {
  const { alunoId } = req.query;

  try {
    const avaliacoes = await prisma.avaliacaoIndicadorAluno.findMany({
      where: alunoId ? { alunoId: Number(alunoId) } : undefined,
      include: {
        indicador: true,
        nota: true
      }
    });

    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações.' });
  }
});

// GET /avaliacoes-indicadores/alunos
router.get('/alunos', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      select: { id: true, name: true }
    });
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ error: 'Erro ao buscar alunos.' });
  }
});

// GET /avaliacoes-indicadores/notas
router.get('/notas', async (req, res) => {
  try {
    const notas = await prisma.notaAvaliativa.findMany({
      select: { id: true, letra: true, valor: true, tipo: true }
    });
    res.json(notas);
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ error: 'Erro ao buscar notas.' });
  }
});

// GET /avaliacoes-indicadores/indicadores
router.get('/indicadores', async (req, res) => {
  try {
    const indicadores = await prisma.indicadorAvaliativo.findMany({
      select: { id: true, descricao: true, tipo: true, anoLetivo: true }
    });
    res.json(indicadores);
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error);
    res.status(500).json({ error: 'Erro ao buscar indicadores.' });
  }
});

// GET /avaliacoes-indicadores?turmaId=...&disciplinaId=...&periodo=...
router.get('/filtro', async (req, res) => {
  const { turmaId, disciplinaId, periodo } = req.query;

  if (!turmaId || !disciplinaId || !periodo) {
    return res.status(400).json({ error: 'turmaId, disciplinaId e periodo são obrigatórios.' });
  }

  try {
    const avaliacoes = await prisma.avaliacaoIndicadorAluno.findMany({
      where: {
        indicador: {
          turmaId: Number(turmaId),
          disciplinaId: Number(disciplinaId),
          periodo: Number(periodo),
        },
      },
      include: {
        aluno: {
          select: { id: true, name: true },
        },
        indicador: {
          select: { id: true, descricao: true, tipo: true },
        },
        nota: {
          select: { letra: true, valor: true },
        },
      },
    });

    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações filtradas:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações.' });
  }
});

// GET /avaliacoes-indicadores/aluno/:id/detalhado
router.get('/aluno/:id/detalhado', async (req, res) => {
  const alunoId = Number(req.params.id);

  try {
    const avaliacoesDetalhadas = await prisma.avaliacaoIndicadorAluno.findMany({
      where: { alunoId },
      include: {
        aluno: { select: { id: true, name: true } },
        indicador: {
          select: {
            id: true,
            descricao: true,
            tipo: true,
            anoLetivo: true,
            periodo: true,
            disciplinaId: true,
            turmaId: true,
            ativo: true
          }
        },
        nota: {
          select: { id: true, letra: true, valor: true, tipo: true }
        }
      }
    });

    if (avaliacoesDetalhadas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma avaliação encontrada para esse aluno.' });
    }

    res.json(avaliacoesDetalhadas);
  } catch (error) {
    console.error('Erro ao buscar avaliações detalhadas:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações detalhadas.' });
  }
});

// Rota PUT para atualizar uma avaliação pelo id com validações
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { alunoId, indicadorId, notaId, observacaoExtra } = req.body;

  if (!alunoId || !indicadorId || !notaId) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    // Verifica se a avaliação existe
    const avaliacaoExistente = await prisma.avaliacaoIndicadorAluno.findUnique({ where: { id } });
    if (!avaliacaoExistente) {
      return res.status(404).json({ error: 'Avaliação não encontrada para atualização.' });
    }

    // Verifica se aluno existe
    const alunoExiste = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!alunoExiste) return res.status(400).json({ error: 'Aluno não existe' });

    // Verifica se indicador existe
    const indicadorExiste = await prisma.indicadorAvaliativo.findUnique({ where: { id: Number(indicadorId) } });
    if (!indicadorExiste) return res.status(400).json({ error: 'Indicador não existe' });

    // Verifica se nota existe
    const notaExiste = await prisma.notaAvaliativa.findUnique({ where: { id: Number(notaId) } });
    if (!notaExiste) return res.status(400).json({ error: 'Nota não existe' });

    // Faz update
    const avaliacaoAtualizada = await prisma.avaliacaoIndicadorAluno.update({
      where: { id },
      data: {
        alunoId: Number(alunoId),
        indicadorId: Number(indicadorId),
        notaId: Number(notaId),
        observacaoExtra: observacaoExtra || null,
      }
    });

    res.json(avaliacaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação.' });
  }
});

// GET /avaliacoes-indicadores/:id - buscar avaliação pelo id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const avaliacao = await prisma.avaliacaoIndicadorAluno.findUnique({
      where: { id }
    });
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json(avaliacao);
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliação.' });
  }
});

module.exports = router;
