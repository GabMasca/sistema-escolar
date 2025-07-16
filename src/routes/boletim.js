const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar novo boletim
router.post('/', async (req, res) => {
  const {
    alunoId,
    turmaId,
    disciplinaId,
    notaAvaliacao1,
    notaAvaliacao2,
    notaAvaliacao3,
    notaTrabalho,
    notaRecuperacao,
    faltas,
    mediaFinal,
    observacoes
  } = req.body;

  try {
    const boletim = await prisma.boletim.create({
      data: {
        alunoId,
        turmaId,
        disciplinaId,
        notaAvaliacao1,
        notaAvaliacao2,
        notaAvaliacao3,
        notaTrabalho,
        notaRecuperacao,
        faltas,
        mediaFinal,
        observacoes
      }
    });

    res.status(201).json({ message: 'Boletim criado com sucesso!', boletim });
  } catch (error) {
    console.error('Erro ao criar boletim:', error);
    res.status(500).json({ error: 'Erro ao criar boletim' });
  }
});

// Listar boletins, opcionalmente filtrando por turma
router.get('/', async (req, res) => {
  const { turmaId } = req.query;

  try {
    const boletins = await prisma.boletim.findMany({
      where: turmaId ? { turmaId: parseInt(turmaId) } : {},
      include: {
        aluno: true,
        turma: true,
        disciplina: true
      }
    });

    res.json(boletins);
  } catch (error) {
    console.error('Erro ao listar boletins:', error);
    res.status(500).json({ error: 'Erro ao listar boletins' });
  }
});

module.exports = router;
