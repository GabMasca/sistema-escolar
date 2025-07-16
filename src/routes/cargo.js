const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /cargos — criar cargo
router.post('/', async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome do cargo é obrigatório.' });
  try {
    const cargo = await prisma.cargo.create({ data: { nome } });
    res.status(201).json(cargo);
  } catch (error) {
    console.error('Erro ao cadastrar cargo:', error);
    res.status(500).json({ error: 'Erro ao cadastrar cargo.' });
  }
});

// GET /cargos — listar cargos
router.get('/', async (req, res) => {
  try {
    const cargos = await prisma.cargo.findMany();
    res.json(cargos);
  } catch (error) {
    console.error('Erro ao buscar cargos:', error);
    res.status(500).json({ error: 'Erro ao buscar cargos.' });
  }
});

module.exports = router;
