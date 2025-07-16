const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /indicadores - Cadastrar novo indicador
router.post('/', async (req, res) => {
  const { descricao, tipo, anoLetivo, periodo, disciplinaId, turmaId } = req.body;

  if (!descricao || !tipo || !anoLetivo || !periodo || !disciplinaId || !turmaId) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const indicador = await prisma.indicadorAvaliativo.create({
      data: { descricao, tipo, anoLetivo, periodo, disciplinaId, turmaId },
    });
    res.status(201).json(indicador);
  } catch (error) {
    console.error('Erro ao criar indicador:', error);
    res.status(500).json({ error: 'Erro ao criar indicador.' });
  }
});

// GET /indicadores?anoLetivo=2025&disciplinaId=1&turmaId=2
router.get('/', async (req, res) => {
  const { anoLetivo, disciplinaId, turmaId } = req.query;

  try {
    const indicadores = await prisma.indicadorAvaliativo.findMany({
      where: {
        anoLetivo: Number(anoLetivo),
        disciplinaId: Number(disciplinaId),
        turmaId: Number(turmaId)
      }
    });
    res.json(indicadores);
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error);
    res.status(500).json({ error: 'Erro ao buscar indicadores.' });
  }
});

module.exports = router;
