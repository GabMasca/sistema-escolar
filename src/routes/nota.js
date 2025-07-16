const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /notas - Cadastrar uma nova nota avaliativa
router.post('/', async (req, res) => {
  const { letra, valor, tipo, anoLetivo, disciplinaId } = req.body;

  if (!letra || !valor || !tipo || !anoLetivo || !disciplinaId) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const nota = await prisma.notaAvaliativa.create({
      data: { letra, valor, tipo, anoLetivo, disciplinaId }
    });
    res.status(201).json(nota);
  } catch (error) {
    console.error('Erro ao criar nota:', error);
    res.status(500).json({ error: 'Erro ao criar nota.' });
  }
});

// GET /notas?disciplinaId=1&tipo=habilidade
router.get('/', async (req, res) => {
  const { disciplinaId, tipo } = req.query;

  try {
    const notas = await prisma.notaAvaliativa.findMany({
      where: {
        disciplinaId: Number(disciplinaId),
        tipo: tipo
      }
    });
    res.json(notas);
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ error: 'Erro ao buscar notas.' });
  }
});

module.exports = router;
