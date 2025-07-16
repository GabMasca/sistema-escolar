const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// POST /disciplinas – Criar disciplina
router.post('/', async (req, res) => {
  const { nome, etapa, cargaHoraria } = req.body;

  if (!nome || !etapa) {
    return res.status(400).json({ error: 'Nome e etapa são obrigatórios' });
  }

  try {
    const disciplina = await prisma.disciplina.create({
      data: {
        nome,
        etapa,
        cargaHoraria: cargaHoraria || null
      }
    });

    res.status(201).json({
      message: 'Disciplina criada com sucesso!',
      disciplina
    });
  } catch (error) {
    console.error('Erro ao criar disciplina:', error);
    res.status(500).json({ error: 'Erro ao criar disciplina' });
  }
});

// GET /disciplinas – Listar todas as disciplinas
router.get('/', async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany();
    res.json(disciplinas);
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
});

module.exports = router;
